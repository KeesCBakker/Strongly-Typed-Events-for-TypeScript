import { ISubscribable } from "ste-core";
import { IEventHandler } from "./IEventHandler";

/**
 * Models an event with a generic sender and generic argument.
 */

export interface IEvent<TSender, TArgs>
  extends ISubscribable<IEventHandler<TSender, TArgs>> {
}
