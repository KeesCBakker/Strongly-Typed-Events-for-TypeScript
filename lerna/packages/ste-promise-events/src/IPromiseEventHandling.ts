import { IBaseEventHandling } from "ste-core";
import { IPromiseEventHandler } from "./IPromiseEventHandler";

/**
 * Indicates the object is capable of handling named events.
 */

export interface IPromiseEventHandling<TSender, TArgs>
    extends IBaseEventHandling<IPromiseEventHandler<TSender, TArgs>> {}
