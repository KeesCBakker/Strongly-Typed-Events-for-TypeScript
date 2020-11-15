import {
    DispatcherBase,
    IPropagationStatus,
    DispatchError,
    EventManagement,
    PromiseSubscription,
    ISubscription
} from "..";

export abstract class PromiseDispatcherBase<
    TEventHandler
> extends DispatcherBase<TEventHandler> {
    constructor() {
        super();
    }

    protected _dispatch(
        executeAsync: boolean,
        scope: any,
        args: IArguments
    ): IPropagationStatus | null {
        throw new DispatchError(
            "_dispatch not supported. Use _dispatchAsPromise."
        );
    }

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
     * @param {*} scrop The scope of the event. The scope becomes the `this` for handler.
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
