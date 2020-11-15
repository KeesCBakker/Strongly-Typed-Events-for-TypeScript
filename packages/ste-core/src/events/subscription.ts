/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */
export class Subscription<TEventHandler> {
    /**
     * Indicates if the subscription has been executed before.
     */
    public isExecuted = false;

    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed once.
     */
    constructor(public handler: TEventHandler, public isOnce: boolean) {}

    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} scope The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    public execute(executeAsync: boolean, scope: any, args: IArguments) {
        if (!this.isOnce || !this.isExecuted) {
            this.isExecuted = true;

            var fn: any = this.handler;

            if (executeAsync) {
                setTimeout(() => {
                    fn.apply(scope, args);
                }, 1);
            } else {
                fn.apply(scope, args);
            }
        }
    }
}
