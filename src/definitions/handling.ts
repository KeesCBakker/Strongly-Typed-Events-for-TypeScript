import { IEventHandler, ISimpleEventHandler, ISignalHandler } from "./handlers";

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

/**
 * Indicates the object is capable of handling named events.
 */
export interface IEventHandling<TSender, TArgs>
  extends IBaseEventHandling<IEventHandler<TSender, TArgs>> {}

/**
 * Indicates the object is capable of handling named simple events.
 */
export interface ISimpleEventHandling<TArgs>
  extends IBaseEventHandling<ISimpleEventHandler<TArgs>> {}

/**
 * Indicates the object is capable of handling named signals.
 */
export interface ISignalHandling extends IBaseEventHandling<ISignalHandler> {}
