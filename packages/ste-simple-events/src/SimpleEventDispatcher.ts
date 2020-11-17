import { DispatcherBase, DispatchError, IPropagationStatus } from "ste-core";
import { ISimpleEventHandler } from "./ISimpleEventHandler";
import { ISimpleEvent } from "./ISimpleEvent";

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 *
 * @export
 * @class SimpleEventDispatcher
 * @extends {DispatcherBase<ISimpleEventHandler<TArgs>>}
 * @implements {ISimpleEvent<TArgs>}
 * @template TArgs
 */
export class SimpleEventDispatcher<TArgs>
    extends DispatcherBase<ISimpleEventHandler<TArgs>>
    implements ISimpleEvent<TArgs> {
    /**
     * Creates an instance of SimpleEventDispatcher.
     *
     * @memberOf SimpleEventDispatcher
     */
    constructor() {
        super();
    }

    /**
     * Dispatches the event.
     *
     * @param {TArgs} args The arguments object.
     * @returns {IPropagationStatus} The status of the event.
     *
     * @memberOf SimpleEventDispatcher
     */
    dispatch(args: TArgs): IPropagationStatus {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }

    /**
     * Dispatches the event without waiting for the result.
     *
     * @param {TArgs} args The arguments object.
     *
     * @memberOf SimpleEventDispatcher
     */
    dispatchAsync(args: TArgs): void {
        this._dispatch(true, this, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     * 
     * @returns {ISimpleEvent<TArgs>} The event.
     * 
     * @memberOf SimpleEventDispatcher
     */
    public asEvent(): ISimpleEvent<TArgs> {
        return super.asEvent();
    }
}
