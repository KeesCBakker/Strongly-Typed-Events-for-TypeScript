/**
 * Manages the event.
 *
 * @export
 * @interface IEventManagement
 */
export interface IEventManagement {
  /**
   * Will unsubscribe the handler.
   *
   * @memberof IEventManagement
   */
  unsub(): void;

  /**
   * Stops the propagation of the event.
   * Cannot be used when async dispatch is done.
   *
   * @memberof IEventManagement
   */
  stopPropagation(): void;
}

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
 * Event handler function with a generic argument
 */
export interface ISimpleEventHandler<TArgs> {
  (args: TArgs, ev: IEventManagement): void;
}

/**
 * Event handler function without arguments
 */
export interface ISignalHandler {
  (ev: IEventManagement): void;
}
