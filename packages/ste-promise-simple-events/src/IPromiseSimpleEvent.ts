import { ISubscribable } from "ste-core";
import { IPromiseSimpleEventHandler } from "./IPromiseSimpleEventHandler";

/**
 * Models a simple event with a generic argument.
 */

export interface IPromiseSimpleEvent<TArgs>
  extends ISubscribable<IPromiseSimpleEventHandler<TArgs>> {
}
