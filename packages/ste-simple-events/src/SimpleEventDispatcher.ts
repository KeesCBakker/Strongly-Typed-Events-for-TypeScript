import { DispatcherBase } from "ste-core";
import { ISimpleEventHandler } from "./ISimpleEventHandler";
import { ISimpleEvent } from "./ISimpleEvent";

/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 */

export class SimpleEventDispatcher<TArgs>
  extends DispatcherBase<ISimpleEventHandler<TArgs>>
  implements ISimpleEvent<TArgs> {
  /**
   * Creates a new SimpleEventDispatcher instance.
   */
  constructor() {
    super();
  }

  /**
   * Dispatches the event.
   * @param args The arguments object.
   */
  dispatch(args: TArgs): void {
    this._dispatch(false, this, arguments);
  }

  /**
   * Dispatches the events thread.
   * @param args The arguments object.
   */
  dispatchAsync(args: TArgs): void {
    this._dispatch(true, this, arguments);
  }

  /**
   * Creates an event from the dispatcher. Will return the dispatcher
   * in a wrapper. This will prevent exposure of any dispatcher methods.
   */
  public asEvent(): ISimpleEvent<TArgs> {
    return super.asEvent();
  }
}
