import { DispatcherBase, DispatchError, IPropagationStatus } from "ste-core";
import { IEvent } from "./IEvent";
import { IEventHandler } from "./IEventHandler";

/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 *
 * @export
 * @class EventDispatcher
 * @extends {DispatcherBase<IEventHandler<TSender, TArgs>>}
 * @implements {IEvent<TSender, TArgs>}
 * @template TSender The sender type.
 * @template TArgs The event arguments type.
 */
export class EventDispatcher<TSender, TArgs>
    extends DispatcherBase<IEventHandler<TSender, TArgs>>
    implements IEvent<TSender, TArgs> {

    /**
     * Creates an instance of EventDispatcher.
     *
     * @memberOf EventDispatcher
     */
    constructor() {
        super();
    }

    /**
     * Dispatches the event.
     * 
     * @param {TSender} sender The sender.
     * @param {TArgs} args The arguments.
     * @returns {IPropagationStatus} The propagation status to interact with the event
     * 
     * @memberOf EventDispatcher
     */
    public dispatch(sender: TSender, args: TArgs): IPropagationStatus {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }

    
    /**
     * Dispatches the event in an async way. Does not support event interaction.
     * 
     * @param {TSender} sender The sender.
     * @param {TArgs} args The arguments.
     * 
     * @memberOf EventDispatcher
     */
    public dispatchAsync(sender: TSender, args: TArgs): void {
        this._dispatch(true, this, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     * 
     * @returns {IEvent<TSender, TArgs>} The event.
     * 
     * @memberOf EventDispatcher
     */
    public asEvent(): IEvent<TSender, TArgs> {
        return super.asEvent();
    }
}
