import { IBaseEventHandling } from "ste-core";
import { IPromiseSimpleEventHandler } from "./IPromiseSimpleEventHandler";

/**
 * Indicates the object is capable of handling named simple events.
 */

export interface IPromiseSimpleEventHandling<TArgs>
  extends IBaseEventHandling<IPromiseSimpleEventHandler<TArgs>> {
}
