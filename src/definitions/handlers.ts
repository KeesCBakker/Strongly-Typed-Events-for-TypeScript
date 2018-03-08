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
}

/**
 * Event handler function with a generic sender and a generic argument.
 */
export interface IEventHandler<TSender, TArgs> {
  /**
   * @sender The sender.
   * @args The argument.
   */
  (sender: TSender, args: TArgs, ev: IEventManagement): any;
}

/**
 * Event handler function with a generic argument
 */
export interface ISimpleEventHandler<TArgs> {
  /**
   * @args The argument.
   */
  (args: TArgs, ev: IEventManagement): any;
}

/**
 * Event handler function without arguments
 */
export interface ISignalHandler {
  (ev: IEventManagement): any;
}

