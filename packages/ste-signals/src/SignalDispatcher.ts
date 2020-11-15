import { DispatcherBase } from "ste-core";
import { ISignal } from "./ISignal";
import { ISignalHandler } from "./ISignalHandler";

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
export class SignalDispatcher
    extends DispatcherBase<ISignalHandler>
    implements ISignal {
    /**
     * Creates a new SignalDispatcher instance.
     */
    constructor() {
        super();
    }

    /**
     * Dispatches the signal.
     */
    public dispatch(): void {
        this._dispatch(false, this, arguments);
    }

    /**
     * Dispatches the signal threaded.
     */
    public dispatchAsync(): void {
        this._dispatch(true, this, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): ISignal {
        return super.asEvent();
    }
}
