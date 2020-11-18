import { DispatchError, IPropagationStatus, PromiseDispatcherBase } from "ste-core";
import { IPromiseSimpleEventHandler } from "./IPromiseSimpleEventHandler";
import { IPromiseSimpleEvent } from "./IPromiseSimpleEvent";

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 * 
 * @export
 * @class PromiseSimpleEventDispatcher
 * @extends {PromiseDispatcherBase<IPromiseSimpleEventHandler<TArgs>>}
 * @implements {IPromiseSimpleEvent<TArgs>}
 * @template TArgs 
 */
export class PromiseSimpleEventDispatcher<TArgs>
    extends PromiseDispatcherBase<IPromiseSimpleEventHandler<TArgs>>
    implements IPromiseSimpleEvent<TArgs> {
    /**
     * Creates a new SimpleEventDispatcher instance.
     */
    constructor() {
        super();
    }

    /**
     * Dispatches the event.
     * @param args The arguments object.
     * @returns {IPropagationStatus} The status of the dispatch.
     * @memberOf PromiseSimpleEventDispatcher
     */
    async dispatch(args: TArgs): Promise<IPropagationStatus> {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new DispatchError("Got `null` back from dispatch.");
        }

        return result;
    }

    /**
     * Dispatches the event without waiting for it to complete.
     * @param args The argument object.
     * @memberOf PromiseSimpleEventDispatcher
     */
    public dispatchAsync(args: TArgs): void {
        this._dispatchAsPromise(true, this, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): IPromiseSimpleEvent<TArgs> {
        return super.asEvent();
    }
}
