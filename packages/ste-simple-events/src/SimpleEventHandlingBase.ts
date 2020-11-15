import { ISimpleEventHandling } from "./ISimpleEventHandling";
import { ISimpleEventHandler } from "./ISimpleEventHandler";
import { SimpleEventList } from "./SimpleEventList";

/**
 * Extends objects with simple event handling capabilities.
 */

export abstract class SimpleEventHandlingBase<TArgs>
  implements ISimpleEventHandling<TArgs> {
  private _events = new SimpleEventList<TArgs>();

  protected get events(): SimpleEventList<TArgs> {
    return this._events;
  }

  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  subscribe(name: string, fn: ISimpleEventHandler<TArgs>): void {
    this._events.get(name).subscribe(fn);
  }

  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  sub(name: string, fn: ISimpleEventHandler<TArgs>): void {
    this.subscribe(name, fn);
  }

  /**
   * Subscribes once to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  one(name: string, fn: ISimpleEventHandler<TArgs>): void {
    this._events.get(name).one(fn);
  }

  /**
   * Checks it the event has a subscription for the specified handler.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  has(name: string, fn: ISimpleEventHandler<TArgs>) {
    return this._events.get(name).has(fn);
  }

  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  unsubscribe(name: string, fn: ISimpleEventHandler<TArgs>): void {
    this._events.get(name).unsubscribe(fn);
  }

  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  unsub(name: string, fn: ISimpleEventHandler<TArgs>): void {
    this.unsubscribe(name, fn);
  }
}
