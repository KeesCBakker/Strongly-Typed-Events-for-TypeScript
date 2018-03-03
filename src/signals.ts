import { ISignal } from "./definitions/subscribables";
import { ISignalHandler } from "./definitions/handlers";
import { ISignalHandling } from "./definitions/handling";
import { DispatcherBase, EventListBase } from "./dispatching";

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
export class SignalDispatcher extends DispatcherBase<ISignalHandler>
  implements ISignal {
  /**
   * Creates a new SignalDispatcher instance.
   */
  constructor() {
    super();
  }

  /**
   * Dispatches the signal.
   */
  public dispatch(): void {
    this._dispatch(false, this, arguments);
  }

  /**
   * Dispatches the signal threaded.
   */
  public dispatchAsync(): void {
    this._dispatch(true, this, arguments);
  }

  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */
  public asEvent(): ISignal {
    return super.asEvent();
  }
}

/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export class SignalList extends EventListBase<SignalDispatcher> {
  /**
   * Creates a new SignalList instance.
   */
  constructor() {
    super();
  }

  /**
   * Creates a new dispatcher instance.
   */
  protected createDispatcher(): SignalDispatcher {
    return new SignalDispatcher();
  }
}

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class SignalHandlingBase implements ISignalHandling {
  private _events = new SignalList();

  protected get events(): SignalList {
    return this._events;
  }

  /**
   * Subscribes once to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  one(name: string, fn: ISignalHandler): void {
    this._events.get(name).one(fn);
  }

  /**
   * Checks it the event has a subscription for the specified handler.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  has(name: string, fn: ISignalHandler): boolean {
    return this._events.get(name).has(fn);
  }

  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  subscribe(name: string, fn: ISignalHandler): void {
    this._events.get(name).subscribe(fn);
  }

  /**
   * Subscribes to the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  sub(name: string, fn: ISignalHandler): void {
    this.subscribe(name, fn);
  }

  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  unsubscribe(name: string, fn: ISignalHandler): void {
    this._events.get(name).unsubscribe(fn);
  }

  /**
   * Unsubscribes from the event with the specified name.
   * @param name The name of the event.
   * @param fn The event handler.
   */
  unsub(name: string, fn: ISignalHandler): void {
    this.unsubscribe(name, fn);
  }
}
