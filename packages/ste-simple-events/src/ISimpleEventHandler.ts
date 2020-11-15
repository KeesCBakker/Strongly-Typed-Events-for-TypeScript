import { IEventManagement } from "ste-core";

/**
 * Event handler function with a generic argument
 */

export interface ISimpleEventHandler<TArgs> {
  (args: TArgs, ev: IEventManagement): void;
}
