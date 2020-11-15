import { DispatcherBase, IPropagationStatus, DispatchError } from "ste-core";
import { ISignal } from "./ISignal";
import { ISignalHandler } from "./ISignalHandler";

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 *
 * @export
 * @class SignalDispatcher
 * @extends {DispatcherBase<ISignalHandler>}
 * @implements {ISignal}
 */
export class SignalDispatcher
    extends DispatcherBase<ISignalHandler>
    implements ISignal {

    /**
     * Creates an instance of SignalDispatcher.
     * 
     * @memberOf SignalDispatcher
     */
    constructor() {
        super();
    }

    /**
     * Dispatches the signal.
     * 
     * @returns {IPropagationStatus} The status of the signal.
     * 
     * @memberOf SignalDispatcher
     */
    public dispatch(): IPropagationStatus {
        const result = this._dispatch(false, this, arguments);
        if (result == null) {
            throw new DispatchError("Got `null` back from dispatch.");
        }
        return result;
    }


    /**
     * Dispatches the signal without waiting for the result.
     * 
     * @memberOf SignalDispatcher
     */
    public dispatchAsync(): void {
        this._dispatch(true, this, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     * 
     * @returns {ISignal} The signal.
     * 
     * @memberOf SignalDispatcher
     */
    public asEvent(): ISignal {
        return super.asEvent();
    }
}
