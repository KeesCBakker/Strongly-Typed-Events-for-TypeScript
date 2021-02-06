import { DispatcherBase } from "..";

/**
 * Event handler type definition for subscription changes.
 */
export type SubscriptionChangeEventHandler = (count: number) => void;

/**
 * Dispatcher for subscription changes.
 * 
 * @export
 * @class SubscriptionChangeEventDispatcher
 * @extends {DispatcherBase<SubscriptionChangeEventHandler>}
 */
export class SubscriptionChangeEventDispatcher extends DispatcherBase<SubscriptionChangeEventHandler>
{
    /**
     * Dispatches the event.
     * 
     * @param {number} count The currrent number of subscriptions.
     * 
     * @memberOf SubscriptionChangeEventDispatcher
     */
    public dispatch(count: number){
        this._dispatch(false, this, arguments);
    }
}