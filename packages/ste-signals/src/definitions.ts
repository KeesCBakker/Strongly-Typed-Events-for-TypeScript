import { IEventManagement, ISubscribable, IBaseEventHandling } from "ste-core";

/**
 * Event handler function without arguments
 */
export interface ISignalHandler {
  (ev: IEventManagement): void;
}

/**
 * Models a signal. This type of events has no arguments.
 * @interface ISignalHandler
 * @extends {ISubscribable<ISignalHandler>}
 */
export interface ISignal extends ISubscribable<ISignalHandler> {}

/**
 * Indicates the object is capable of handling named signals.
 */
export interface ISignalHandling extends IBaseEventHandling<ISignalHandler> {}
