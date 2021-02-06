import { ISubscription } from "./ISubscription";

/**
 * Subscription implementation for events with promises.
 * 
 * @export
 * @class PromiseSubscription
 * @implements {ISubscription<TEventHandler>}
 * @template TEventHandler The event specification.
 */
export class PromiseSubscription<TEventHandler> implements ISubscription<TEventHandler> {

    /**
     * Indicates if the subscription has been executed before.
     * 
     * @memberOf PromiseSubscription
     */
    public isExecuted = false;

    /**
     * Creates an instance of PromiseSubscription.
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     * 
     * @memberOf PromiseSubscription
     */
    constructor(
        public handler: TEventHandler,
        public isOnce: boolean
    ) {}

    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     * 
     * @memberOf PromiseSubscription
     */
    public async execute(
        executeAsync: boolean,
        scope: any,
        args: IArguments
    ): Promise<void> {

        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;

            //TODO: do we need to cast to any -- seems yuck
            var fn: any = this.handler;

            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);

                return;
            }

            let result = fn.apply(scope, args) as Promise<void>;
            await result;
        }
    }
}
