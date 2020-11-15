import { 
    DispatcherWrapper, 
    ISubscribable, 
    Subscription, 
    EventManagement } from "..";

/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
export abstract class DispatcherBase<TEventHandler>
    implements ISubscribable<TEventHandler> {
    private _wrap = new DispatcherWrapper(this);
    private _subscriptions = new Array<Subscription<TEventHandler>>();

    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     *
     * @memberOf DispatcherBase
     */
    public get count() {
        return this._subscriptions.length;
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    public subscribe(fn: TEventHandler): () => void {
        if (fn) {
            this._subscriptions.push(
                new Subscription<TEventHandler>(fn, false)
            );
        }
        return () => {
            this.unsubscribe(fn);
        };
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    public sub(fn: TEventHandler): () => void {
        return this.subscribe(fn);
    }

    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    public one(fn: TEventHandler): () => void {
        if (fn) {
            this._subscriptions.push(new Subscription<TEventHandler>(fn, true));
        }
        return () => {
            this.unsubscribe(fn);
        };
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    public has(fn: TEventHandler): boolean {
        if (!fn) return false;
        return this._subscriptions.some((sub) => sub.handler == fn);
    }

    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    public unsubscribe(fn: TEventHandler): void {
        if (!fn) return;

        for (let i = 0; i < this._subscriptions.length; i++) {
            if (this._subscriptions[i].handler == fn) {
                this._subscriptions.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    public unsub(fn: TEventHandler): void {
        this.unsubscribe(fn);
    }

    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event. The scope becomes the "this" for handler.
     * @param {IArguments} args The arguments for the event.
     */
    protected _dispatch(
        executeAsync: boolean,
        scope: any,
        args: IArguments
    ): void {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new EventManagement(() => this.unsub(sub.handler));
            let nargs: any = Array.prototype.slice.call(args);
            nargs.push(ev);

            sub.execute(executeAsync, scope, nargs as IArguments);

            //cleanup subs that are no longer needed
            this.cleanup(sub);

            if (!executeAsync && ev.propagationStopped) {
                break;
            }
        }
    }

    /**
     * Cleans up subs that ran and should run only once.
     */
    protected cleanup(sub: Subscription<TEventHandler>) {
        if (sub.isOnce && sub.isExecuted) {
            let i = this._subscriptions.indexOf(sub);
            if (i > -1) {
                this._subscriptions.splice(i, 1);
            }
        }
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): ISubscribable<TEventHandler> {
        return this._wrap;
    }

    /**
     * Clears all the subscriptions.
     */
    public clear(): void {
        this._subscriptions.splice(0, this._subscriptions.length);
    }
}
