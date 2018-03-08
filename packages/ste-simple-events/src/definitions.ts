import { IEventManagement, ISubscribable, IBaseEventHandling } from "ste-core";

/**
 * Models a simple event with a generic argument.
 */
export interface ISimpleEvent<TArgs>
  extends ISubscribable<ISimpleEventHandler<TArgs>> {}

/**
 * Event handler function with a generic argument
 */
export interface ISimpleEventHandler<TArgs> {
  (args: TArgs, ev: IEventManagement): void;
}

/**
 * Indicates the object is capable of handling named simple events.
 */
export interface ISimpleEventHandling<TArgs>
  extends IBaseEventHandling<ISimpleEventHandler<TArgs>> {}
