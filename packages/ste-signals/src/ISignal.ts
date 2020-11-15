import { ISubscribable } from "ste-core";
import { ISignalHandler } from "./ISignalHandler";

/**
 * Models a signal. This type of events has no arguments.
 * @interface ISignalHandler
 * @extends {ISubscribable<ISignalHandler>}
 */
export interface ISignal extends ISubscribable<ISignalHandler> {}
