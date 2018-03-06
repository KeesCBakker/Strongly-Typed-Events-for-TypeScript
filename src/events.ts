import { IEvent } from "./definitions/subscribables";
import { IEventHandler } from "./definitions/handlers";
import { IEventHandling } from "./definitions/handling";
import { DispatcherBase, EventListBase } from "./dispatching";

/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 */
export class EventDispatcher<TSender, TArgs> extends DispatcherBase<
  IEventHandler<TSender, TArgs>
> implements IEvent<TSender, TArgs> {
  /**
   * Creates a new EventDispatcher instance.
   */
  constructor() {
    super();
  }

  /**
   * Dispatches the event.
   * @param sender The sender.
   * @param args The arguments object.
   */
  public dispatch(sender: TSender, args: TArgs): void {
    this._dispatch(false, this, arguments);
  }

  /**
   * Dispatches the events thread.
   * @param sender The sender.
   * @param args The arguments object.
   */
  public dispatchAsync(sender: TSender, args: TArgs): void {
    this._dispatch(true, this, arguments);
  }

  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */
  public asEvent(): IEvent<TSender, TArgs> {
    return super.asEvent();
  }
}

/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export class EventList<TSender, TArgs> extends EventListBase<
  EventDispatcher<TSender, TArgs>
> {
  /**
   * Creates a new EventList instance.
   */
  constructor() {
    super();
  }

  /**
   * Creates a new dispatcher instance.
   */
  protected createDispatcher(): EventDispatcher<TSender, TArgs> {
    return new EventDispatcher<TSender, TArgs>();
  }
}

/**
 * Extends objects with event handling capabilities.
 */
export abstract class EventHandlingBase<TSender, TArgs>
  implements IEventHandling<TSender, TArgs> {
  private _events = new EventList<TSender, TArgs>();

  /**
   * Gets the list with all the event dispatchers.
   */
  protected get events(): EventList<TSender, TArgs> {
    return this._events;
  }

  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  subscribe(name: string, fn: IEventHandler<TSender, TArgs>): void {
    this._events.get(name).subscribe(fn);
  }

  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  sub(name: string, fn: IEventHandler<TSender, TArgs>): void {
    this.subscribe(name, fn);
  }

  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  unsubscribe(name: string, fn: IEventHandler<TSender, TArgs>): void {
    this._events.get(name).unsubscribe(fn);
  }

  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  unsub(name: string, fn: IEventHandler<TSender, TArgs>): void {
    this.unsubscribe(name, fn);
  }

  /**
   * Subscribes to once the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  one(name: string, fn: IEventHandler<TSender, TArgs>): void {
    this._events.get(name).one(fn);
  }

  /**
   * Subscribes to once the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  has(name: string, fn: IEventHandler<TSender, TArgs>): boolean {
    return this._events.get(name).has(fn);
  }
}
