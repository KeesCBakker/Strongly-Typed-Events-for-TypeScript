import { ISubscribable } from "ste-core";
import { ISimpleEventHandler } from "./ISimpleEventHandler";

/**
 * Models a simple event with a generic argument.
 */

export interface ISimpleEvent<TArgs>
  extends ISubscribable<ISimpleEventHandler<TArgs>> {
}
