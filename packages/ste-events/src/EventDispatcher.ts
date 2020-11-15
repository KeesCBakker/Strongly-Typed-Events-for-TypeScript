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
 * @template TSender
 * @template TArgs
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
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The arguments object.
     * @returns {IPropagationStatus} The event status.
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
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
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
