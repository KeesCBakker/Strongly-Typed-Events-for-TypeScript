import { IEventManagement } from "ste-core";

/**
 * Event handler function without arguments
 */
export interface ISignalHandler {
  (ev: IEventManagement): void;
}
