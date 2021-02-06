import { SubscriptionChangeEventHandler } from "../dispatching/SubscriptionChangeEventHandler";

/**
 * Indicates the object implements generic subscriptions.
 * 
 * @export
 * @interface ISubscribable
 * @template THandlerType The type of events to handle.
 */
export interface ISubscribable<THandlerType> {

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
   * @param {THandlerType} fn The event handler that is called when the event is dispatched.
   * @returns {() => void} function that unsubscribes the event handler from the event.
   * 
   * @memberOf ISubscribable
   */
  subscribe(fn: THandlerType): () => void;

  /**
   * Subscribe to the event.
   * @param {THandlerType} fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   * 
   * @memberOf ISubscribable
   */
  sub(fn: THandlerType): () => void;

  /**
   * Unsubscribe from the event.
   * @param {THandlerType} fn The event handler that will be unsubsribed from the event.
   * 
   * @memberOf ISubscribable
   */
  unsubscribe(fn: THandlerType): void;

  /**
   * Unsubscribe from the event.
   * @param {THandlerType} fn The event handler that will be unsubsribed from the event.
   * 
   * @memberOf ISubscribable
   */
  unsub(fn: THandlerType): void;

  /**
   * Subscribes to the event only once.
   * @param {THandlerType} fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   * 
   * @memberOf ISubscribable
   */
  one(fn: THandlerType): () => void;

  /**
   * Checks it the event has a subscription for the specified handler.
   * @param {THandlerType} fn The event handler.
   * 
   * @memberOf ISubscribable
   */
  has(fn: THandlerType): boolean;

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
