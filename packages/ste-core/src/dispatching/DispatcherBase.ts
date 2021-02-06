import { IPropagationStatus } from "./IPropagationStatus";
import { ISubscription } from "../events/ISubscription";
import {
    DispatcherWrapper,
    ISubscribable,
    Subscription,
    EventManagement,
} from "..";

/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
export abstract class DispatcherBase<TEventHandler>
    implements ISubscribable<TEventHandler> {
    private _wrap = new DispatcherWrapper(this);
    protected _subscriptions = new Array<ISubscription<TEventHandler>>();

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
            this._subscriptions.push(this.createSubscription(fn, false));
            this.triggerSubscriptionChange();
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
            this._subscriptions.push(this.createSubscription(fn, true));
            this.triggerSubscriptionChange();
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
     * @param fn The event handler.
     */
    public unsub(fn: TEventHandler): void {
        this.unsubscribe(fn);
    }

    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync `True` if the even should be executed async.
     * @param {*} scrop The scope of the event. The scope becomes the `this` for handler.
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

    protected createSubscription(
        handler: TEventHandler,
        isOnce: boolean
    ): ISubscription<TEventHandler> {
        return new Subscription<TEventHandler>(handler, isOnce);
    }

    /**
     * Cleans up subs that ran and should run only once.
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
     */
    public asEvent(): ISubscribable<TEventHandler> {
        return this._wrap;
    }

    /**
     * Clears all the subscriptions.
     */
    public clear(): void {
        if (this._subscriptions.length != 0) {
            this._subscriptions.splice(0, this._subscriptions.length);
            this.triggerSubscriptionChange();
        }
    }

    protected triggerSubscriptionChange(): void {}
}
