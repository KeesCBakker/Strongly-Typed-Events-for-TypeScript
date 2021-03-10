import { SubscriptionChangeEventHandler } from "../dispatching/SubscriptionChangeEventHandler";

/**
 * Indicates the object implements generic subscriptions.
 * 
 * @export
 * @interface ISubscribable
 * @template TEventHandler The type of events to handle.
 */
export interface ISubscribable<TEventHandler> {

  /**
   * Returns the number of subscriptions.
   *
   * @type {number}
   * @memberOf ISubscribable
   */
  readonly count: number;

  /**
   * Subscribe to the event.
   * 
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * @returns {() => void} function that unsubscribes the event handler from the event.
   * 
   * @memberOf ISubscribable
   */
  subscribe(fn: TEventHandler): () => void;

  /**
   * Subscribe to the event.
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   * 
   * @memberOf ISubscribable
   */
  sub(fn: TEventHandler): () => void;

  /**
   * Unsubscribe from the event.
   * @param {TEventHandler} fn The event handler that will be unsubsribed from the event.
   * 
   * @memberOf ISubscribable
   */
  unsubscribe(fn: TEventHandler): void;

  /**
   * Unsubscribe from the event.
   * @param {TEventHandler} fn The event handler that will be unsubsribed from the event.
   * 
   * @memberOf ISubscribable
   */
  unsub(fn: TEventHandler): void;

  /**
   * Subscribes to the event only once.
   * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   * 
   * @memberOf ISubscribable
   */
  one(fn: TEventHandler): () => void;

  /**
   * Checks it the event has a subscription for the specified handler.
   * @param {TEventHandler} fn The event handler.
   * 
   * @memberOf ISubscribable
   */
  has(fn: TEventHandler): boolean;

  /**
   * Clears all the subscriptions.
   * 
   * @memberOf ISubscribable
   */
  clear(): void;

  /**
   * Triggered when subscriptions are changed (added or removed).
   * 
   * @type {ISubscribable<SubscriptionChangeEventHandler>}
   * @memberOf ISubscribable
   */
  readonly onSubscriptionChange: ISubscribable<SubscriptionChangeEventHandler>;
}
