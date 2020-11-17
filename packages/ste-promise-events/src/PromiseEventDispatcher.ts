import { IPromiseEvent } from './IPromiseEvent';
import { IPromiseEventHandler } from './IPromiseEventHandler';
import {
    DispatchError,
    IPropagationStatus,
    PromiseDispatcherBase,
} from "ste-core";

/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 * 
 * @export
 * @class PromiseEventDispatcher
 * @extends {PromiseDispatcherBase<IPromiseEventHandler<TSender, TArgs>>}
 * @implements {IPromiseEvent<TSender, TArgs>}
 * @template TSender 
 * @template TArgs 
 */
export class PromiseEventDispatcher<TSender, TArgs>
    extends PromiseDispatcherBase<IPromiseEventHandler<TSender, TArgs>>
    implements IPromiseEvent<TSender, TArgs> {
    /**
     * Creates a new EventDispatcher instance.
     */
    constructor() {
        super();
    }

    /**
     * Dispatches the event.
     * 
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The argument object.
     * @returns {Promise<IPropagationStatus>} The status.
     * 
     * @memberOf PromiseEventDispatcher
     */
    public async dispatch(
        sender: TSender,
        args: TArgs
    ): Promise<IPropagationStatus> {
        const result = await this._dispatchAsPromise(false, this, arguments);
        if (result == null) {
            throw new DispatchError("Got `null` back from dispatch.");
        }

        return result;
    }

    /**
     * Dispatches the event without waiting for the result.
     * 
     * @param {TSender} sender The sender object.
     * @param {TArgs} args The argument object.
     * 
     * @memberOf PromiseEventDispatcher
     */
    public dispatchAsync(sender: TSender, args: TArgs): void {
        this._dispatchAsPromise(true, this, arguments);
    }

    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    public asEvent(): IPromiseEvent<TSender, TArgs> {
        return super.asEvent();
    }
}