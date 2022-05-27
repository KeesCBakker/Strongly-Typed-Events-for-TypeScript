import { ISubscribable } from "ste-core";
import { ISignalHandler } from ".";

/**
 * Models a signal. This type of events has no arguments.
 * 
 * @export
 * @interface ISignal
 * @extends {ISubscribable<ISignalHandler>}
 */
export interface ISignal extends ISubscribable<ISignalHandler> {
}
