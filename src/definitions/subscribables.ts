import { IEventHandler, ISimpleEventHandler, ISignalHandler } from "./handlers";

/**
 * Indicates the object implements generic subscriptions.
 */
export interface ISubscribable<THandlerType> {
  /**
   * Subscribe to the event.
   * @param fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   */
  subscribe(fn: THandlerType): () => void;

  /**
   * Subscribe to the event.
   * @param fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   */
  sub(fn: THandlerType): () => void;

  /**
   * Unsubscribe from the event.
   * @param fn The event handler that will be unsubsribed from the event.
   */
  unsubscribe(fn: THandlerType): void;

  /**
   * Unsubscribe from the event.
   * @param fn The event handler that will be unsubsribed from the event.
   */
  unsub(fn: THandlerType): void;

  /**
   * Subscribes to the event only once.
   * @param fn The event handler that is called when the event is dispatched.
   * @returns A function that unsubscribes the event handler from the event.
   */
  one(fn: THandlerType): () => void;

  /**
   * Checks it the event has a subscription for the specified handler.
   * @param fn The event handler.
   */
  has(fn: THandlerType): boolean;

  /**
   * Clears all the subscriptions.
   */
  clear(): void;
}

/**
 * Models an event with a generic sender and generic argument.
 */
export interface IEvent<TSender, TArgs>
  extends ISubscribable<IEventHandler<TSender, TArgs>> {}

/**
 * Models a simple event with a generic argument.
 */
export interface ISimpleEvent<TArgs>
  extends ISubscribable<ISimpleEventHandler<TArgs>> {}

/**
 * Models a signal. This type of events has no arguments.
 * @interface ISignalHandler
 * @extends {ISubscribable<ISignalHandler>}
 */
export interface ISignal extends ISubscribable<ISignalHandler> {}
