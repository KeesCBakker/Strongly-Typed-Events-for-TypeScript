import { EventDispatcher } from "./EventDispatcher";

/**
 * Similar to EventList, but instead of TArgs, a map of event names ang argument types is provided with TArgsMap.
 */

export class NonUniformEventList<
  TSender,
  TArgsMap extends { [event: string]: any; }
  > {
  private _events: {
    [K in keyof TArgsMap]?: EventDispatcher<TSender, TArgsMap[K]>;
  } = {};

  /**
   * Gets the dispatcher associated with the name.
   * @param name The name of the event.
   */
  get<K extends keyof TArgsMap>(
    name: K
  ): EventDispatcher<TSender, TArgsMap[K]> {
    if (this._events[name]) {
      // @TODO avoid typecasting. Not sure why TS thinks this._events[name] could still be undefined.
      return this._events[name] as EventDispatcher<TSender, TArgsMap[K]>;
    }

    const event = this.createDispatcher<TArgsMap[K]>();
    this._events[name] = event;
    return event;
  }

  /**
   * Removes the dispatcher associated with the name.
   * @param name The name of the event.
   */
  remove(name: string): void {
    delete this._events[name];
  }

  /**
   * Creates a new dispatcher instance.
   */
  protected createDispatcher<T>(): EventDispatcher<TSender, T> {
    return new EventDispatcher<TSender, T>();
  }
}
