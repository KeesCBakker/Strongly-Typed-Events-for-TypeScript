import { IEventManagement } from "ste-core";

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
