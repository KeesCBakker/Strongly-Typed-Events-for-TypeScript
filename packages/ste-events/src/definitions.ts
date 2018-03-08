import { IEventManagement, ISubscribable, IBaseEventHandling } from "ste-core";

/**
 * Models an event with a generic sender and generic argument.
 */
export interface IEvent<TSender, TArgs>
  extends ISubscribable<IEventHandler<TSender, TArgs>> {}

/**
 * Interface for event handlers.
 *
 * @export
 * @interface IEventHandler
 * @template TSender The sender type.
 * @template TArgs The arguments type.
 */
export interface IEventHandler<TSender, TArgs> {
  (sender: TSender, args: TArgs, ev: IEventManagement): void;
}

/**
 * Indicates the object is capable of handling named events.
 */
export interface IEventHandling<TSender, TArgs>
  extends IBaseEventHandling<IEventHandler<TSender, TArgs>> {}
