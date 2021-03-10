import { IEventManagement } from "./IEventManagement";

/**
 * Allows the user to interact with the event.
 *
 * @export
 * @class EventManagement
 * @implements {IEventManagement}
 */
export class EventManagement implements IEventManagement {
    public propagationStopped = false;

    /**
     * Creates an instance of EventManagement.
     * @param {() => void} unsub An unsubscribe handler.
     * 
     * @memberOf EventManagement
     */
    constructor(public unsub: () => void) {}

    /**
     * Stops the propagation of the event.
     * Cannot be used when async dispatch is done.
     * 
     * @memberOf EventManagement
     */
    public stopPropagation() {
        this.propagationStopped = true;
    }
}
