/**
 * Indicates the object is able to handle events.
 * 
 * @export
 * @interface IBaseEventHandling
 * @template TEventHandler The event handler type.
 */
export interface IBaseEventHandling<TEventHandler> {

  /**
   * Subscribe to the event with the specified name.
   * 
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * 
   * @memberOf IBaseEventHandling
   */
  subscribe(name: string, fn: TEventHandler): void;

  /**
   * Subscribe to the event with the specified name.
   * 
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * 
   * @memberOf IBaseEventHandling
   */
  sub(name: string, fn: TEventHandler): void;

  /**
   * Unsubscribe from the event with the specified name.
   * 
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler that is will be unsubsribed from the event.
   * 
   * @memberOf IBaseEventHandling
   */
  unsubscribe(name: string, fn: TEventHandler): void;

  /**
   * Unsubscribe from the event with the specified name.
   * 
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler that is will be unsubsribed from the event.
   * 
   * @memberOf IBaseEventHandling
   */
  unsub(name: string, fn: TEventHandler): void;

  /**
   * Subscribe once to the event with the specified name.
   * 
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * 
   * @memberOf IBaseEventHandling
   */
  one(name: string, fn: TEventHandler): void;

  /**
   * Checks it the event has a subscription for the specified handler.
   * @param {string} name The name of the event.
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * 
   * @memberOf IBaseEventHandling
   */
  has(name: string, fn: TEventHandler): boolean;
}
