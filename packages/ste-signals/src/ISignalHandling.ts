import { IBaseEventHandling } from "ste-core";
import { ISignalHandler } from "./ISignalHandler";

/**
 * Indicates the object is capable of handling named signals.
 */
export interface ISignalHandling extends IBaseEventHandling<ISignalHandler> { }
