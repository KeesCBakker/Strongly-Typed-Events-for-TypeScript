/**
 * Manages the event.
 *
 * @export
 * @interface IEventManagement
 */
export interface IEventManagement {
  /**
   * Will unsubscribe the handler.
   *
   * @memberof IEventManagement
   */
  unsub(): void;

  /**
   * Stops the propagation of the event.
   * Cannot be used when async dispatch is done.
   *
   * @memberof IEventManagement
   */
  stopPropagation(): void;
}

/**
 * Allows the user to interact with the event.
 *
 * @class EventManagement
 * @implements {IEventManagement}
 */
export class EventManagement implements IEventManagement {
  public propagationStopped = false;

  constructor(public unsub: () => void) {}

  public stopPropagation() {
    this.propagationStopped = true;
  }
}
