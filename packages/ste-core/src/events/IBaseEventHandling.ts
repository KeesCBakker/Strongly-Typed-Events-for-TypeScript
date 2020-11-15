/**
 * Base interface for event handling.
 */
export interface IBaseEventHandling<TEventHandler> {
  /**
   * Subscribe to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler that is called when the event is dispatched.
   */
  subscribe(name: string, fn: TEventHandler): void;

  /**
   * Subscribe to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler that is called when the event is dispatched.
   */
  sub(name: string, fn: TEventHandler): void;

  /**
   * Unsubscribe from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler that is will be unsubsribed from the event.
   */
  unsubscribe(name: string, fn: TEventHandler): void;

  /**
   * Unsubscribe from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler that is will be unsubsribed from the event.
   */
  unsub(name: string, fn: TEventHandler): void;

  /**
   * Subscribe once to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler that is called when the event is dispatched.
   */
  one(name: string, fn: TEventHandler): void;

  /**
   * Checks it the event has a subscription for the specified handler.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  has(name: string, fn: TEventHandler): boolean;
}
