import {
    ISubscribable,
    DispatcherWrapper,
    SubscriptionChangeEventDispatcher,
    ISubscription,
    IPropagationStatus,
    EventManagement,
    Subscription,
    SubscriptionChangeEventHandler,
} from "..";

/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 * 
 * @export
 * @abstract
 * @class DispatcherBase
 * @implements {ISubscribable<TEventHandler>}
 * @template TEventHandler 
 */
export abstract class DispatcherBase<TEventHandler>
    implements ISubscribable<TEventHandler> {
    private _wrap: DispatcherWrapper<TEventHandler> | undefined;
    private _onSubscriptionChange:
        | SubscriptionChangeEventDispatcher
        | undefined;

    /**
     * The subscriptions.
     * 
     * @protected
     * 
     * @memberOf DispatcherBase
     */
    protected _subscriptions = new Array<ISubscription<TEventHandler>>();

    /**
     * Returns the number of subscriptions.
     * 
     * @readonly
     * @type {number}
     * @memberOf DispatcherBase
     */
    get count(): number {
        return this._subscriptions.length;
    }

    
    /**
     * Triggered when subscriptions are changed (added or removed).
     * 
     * @readonly
     * @type {ISubscribable<SubscriptionChangeEventHandler>}
     * @memberOf DispatcherBase
     */
    get onSubscriptionChange():ISubscribable<SubscriptionChangeEventHandler> {
        if (this._onSubscriptionChange == null) {
            this._onSubscriptionChange = new SubscriptionChangeEventDispatcher();
        }

        return this._onSubscriptionChange.asEvent();
    }

    /**
     * Subscribe to the event dispatcher.
     * 
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     *
     * @memberOf DispatcherBase
     */
    subscribe(fn: TEventHandler): () => void {
        if (fn) {
            this._subscriptions.push(this.createSubscription(fn, false));
            this.triggerSubscriptionChange();
        }
        return () => {
            this.unsubscribe(fn);
        };
    }

    /**
     * Subscribe to the event dispatcher.
     * 
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     *
     * @memberOf DispatcherBase
     */
    sub(fn: TEventHandler): () => void {
        return this.subscribe(fn);
    }

    /**
     * Subscribe once to the event with the specified name.
     * 
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     * 
     * @memberOf DispatcherBase
     */
    one(fn: TEventHandler): () => void {
        if (fn) {
            this._subscriptions.push(this.createSubscription(fn, true));
            this.triggerSubscriptionChange();
        }
        return () => {
            this.unsubscribe(fn);
        };
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     *     
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf DispatcherBase
     */
    has(fn: TEventHandler): boolean {
        if (!fn) return false;
        return this._subscriptions.some((sub) => sub.handler == fn);
    }

    /**
     * Unsubscribes the handler from the dispatcher.
     * 
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf DispatcherBase
     */
    unsubscribe(fn: TEventHandler): void {
        if (!fn) return;

        let changes = false;

        for (let i = 0; i < this._subscriptions.length; i++) {
            if (this._subscriptions[i].handler == fn) {
                this._subscriptions.splice(i, 1);
                changes = true;
                break;
            }
        }

        if (changes) {
            this.triggerSubscriptionChange();
        }
    }

    /**
     * Unsubscribes the handler from the dispatcher.
     * 
     * @param {TEventHandler} fn The event handler.
     * 
     * @memberOf DispatcherBase
     */
    unsub(fn: TEventHandler): void {
        this.unsubscribe(fn);
    }

    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scope The scope of the event. The scope becomes the `this` for handler.
     * @param {IArguments} args The arguments for the event.
     * @returns {(IPropagationStatus | null)} The propagation status, or if an `executeAsync` is used `null`.
     *
     * @memberOf DispatcherBase
     */
    protected _dispatch(
        executeAsync: boolean,
        scope: any,
        args: IArguments
    ): IPropagationStatus | null {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new EventManagement(() => this.unsub(sub.handler));
            let nargs: any = Array.prototype.slice.call(args);
            nargs.push(ev);

            let s = sub as Subscription<TEventHandler>;
            s.execute(executeAsync, scope, nargs as IArguments);

            //cleanup subs that are no longer needed
            this.cleanup(sub);

            if (!executeAsync && ev.propagationStopped) {
                return { propagationStopped: true };
            }
        }

        if (executeAsync) {
            return null;
        }

        return { propagationStopped: false };
    }

    /**
     * Creates a subscription.
     * 
     * @protected
     * @param {TEventHandler} handler The handler.
     * @param {boolean} isOnce True if the handler should run only one.
     * @returns {ISubscription<TEventHandler>} The subscription.
     * 
     * @memberOf DispatcherBase
     */
    protected createSubscription(
        handler: TEventHandler,
        isOnce: boolean
    ): ISubscription<TEventHandler> {
        return new Subscription<TEventHandler>(handler, isOnce);
    }

    /**
     * Cleans up subs that ran and should run only once.
     * 
     * @protected
     * @param {ISubscription<TEventHandler>} sub The subscription.
     * 
     * @memberOf DispatcherBase
     */
    protected cleanup(sub: ISubscription<TEventHandler>) {
        let changes = false;
        if (sub.isOnce && sub.isExecuted) {
            let i = this._subscriptions.indexOf(sub);
            if (i > -1) {
                this._subscriptions.splice(i, 1);
                changes = true;
            }
        }

        if (changes) {
            this.triggerSubscriptionChange();
        }
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     * 
     * @returns {ISubscribable<TEventHandler>} 
     * 
     * @memberOf DispatcherBase
     */
    asEvent(): ISubscribable<TEventHandler> {
        if (this._wrap == null) {
            this._wrap = new DispatcherWrapper<TEventHandler>(this);
        }

        return this._wrap;
    }

    /**
     * Clears the subscriptions.
     * 
     * @memberOf DispatcherBase
     */
    clear(): void {
        if (this._subscriptions.length != 0) {
            this._subscriptions.splice(0, this._subscriptions.length);
            this.triggerSubscriptionChange();
        }
    }

    /**
     * Triggers the subscription change event.
     * 
     * @private
     * 
     * @memberOf DispatcherBase
     */
    private triggerSubscriptionChange(): void {
        if (this._onSubscriptionChange != null) {
            this._onSubscriptionChange.dispatch(this.count);
        }
    }
}
