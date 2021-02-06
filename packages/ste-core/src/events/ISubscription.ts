/**
 * Indicates the object is a subscription.
 * 
 * @export
 * @interface ISubscription
 * @template TEventHandler The type of event handler.
 */
export interface ISubscription<TEventHandler> {
    
    /**
     * Indicates if the eventhandler has been executed.
     * 
     * @type {boolean}
     * @memberOf ISubscription
     */
    readonly isExecuted: boolean;

    /**
     * Indicates if the event handler should run once when the event
     * is dispatched.
     * 
     * @type {boolean}
     * @memberOf ISubscription
     */
    readonly isOnce: boolean;

    /**
     * The event handler.
     * 
     * @type {TEventHandler}
     * @memberOf ISubscription
     */
    readonly handler: TEventHandler;
}
