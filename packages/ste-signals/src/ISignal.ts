import { ISubscribable } from "ste-core";
import { ISignalHandler } from "./ISignalHandler";

/**
 * Models a signal. This type of events has no arguments.
 * 
 * @export
 * @interface ISignal
 * @extends {ISubscribable<ISignalHandler>}
 */
export interface ISignal extends ISubscribable<ISignalHandler> {

    /**
     * Invoked when the subscriptions changes.
     *
     * @type {ISignal}
     * @memberof ISignal
     */
    readonly onSubscriptionChange: ISignal;
}
