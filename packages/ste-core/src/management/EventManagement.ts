import { IEventManagement } from "./IEventManagement";

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
