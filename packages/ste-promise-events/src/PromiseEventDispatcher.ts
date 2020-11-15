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
     * @param sender The sender.
     * @param args The arguments object.
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
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
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
