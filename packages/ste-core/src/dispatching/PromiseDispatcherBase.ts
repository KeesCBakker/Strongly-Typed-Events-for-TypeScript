import {
    DispatcherBase,
    IPropagationStatus,
    DispatchError,
    EventManagement,
    PromiseSubscription,
    ISubscription,
} from "..";

/**
 * Dispatcher base for dispatchers that use promises. Each promise
 * is awaited before the next is dispatched, unless the event is
 * dispatched with the executeAsync flag.
 *
 * @export
 * @abstract
 * @class PromiseDispatcherBase
 * @extends {DispatcherBase<TEventHandler>}
 * @template TEventHandler
 */
export abstract class PromiseDispatcherBase<
    TEventHandler
> extends DispatcherBase<TEventHandler> {
    /**
     * The normal dispatch cannot be used in this class.
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
        throw new DispatchError(
            "_dispatch not supported. Use _dispatchAsPromise."
        );
    }

    /**
     * Crates a new subscription.
     *
     * @protected
     * @param {TEventHandler} handler The handler.
     * @param {boolean} isOnce Indicates if the handler should only run once.
     * @returns {ISubscription<TEventHandler>} The subscription.
     *
     * @memberOf PromiseDispatcherBase
     */
    protected createSubscription(
        handler: TEventHandler,
        isOnce: boolean
    ): ISubscription<TEventHandler> {
        return new PromiseSubscription<TEventHandler>(handler, isOnce);
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
    protected async _dispatchAsPromise(
        executeAsync: boolean,
        scope: any,
        args: IArguments
    ): Promise<IPropagationStatus | null> {
        //execute on a copy because of bug #9
        for (let sub of [...this._subscriptions]) {
            let ev = new EventManagement(() => this.unsub(sub.handler));
            let nargs: any = Array.prototype.slice.call(args);
            nargs.push(ev);

            let ps = sub as PromiseSubscription<TEventHandler>;
            await ps.execute(executeAsync, scope, nargs as IArguments);

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
}
