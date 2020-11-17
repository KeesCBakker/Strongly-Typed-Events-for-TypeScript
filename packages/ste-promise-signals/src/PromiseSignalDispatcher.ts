import { DispatchError, IPropagationStatus, PromiseDispatcherBase } from 'ste-core';
import { IPromiseSignal } from './IPromiseSignal';
import { IPromiseSignalHandler } from './IPromiseSignalHandler';

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
export class PromiseSignalDispatcher
    extends PromiseDispatcherBase<IPromiseSignalHandler>
    implements IPromiseSignal {
    /**
     * Creates a new SignalDispatcher instance.
     */
    constructor() {
        super();
    }

    /**
     * Dispatches the signal.
     *
     * @returns {IPropagationStatus} The status of the dispatch.
     *
     * @memberOf SignalDispatcher
     */
    public async dispatch(): Promise<IPropagationStatus> {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new DispatchError("Got `null` back from dispatch.");
        }

        return result;
    }

    /**
     * Dispatches the signal threaded.
     */
    public dispatchAsync(): void {
        this._dispatchAsPromise(true, this, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): IPromiseSignal {
        return super.asEvent();
    }
}


