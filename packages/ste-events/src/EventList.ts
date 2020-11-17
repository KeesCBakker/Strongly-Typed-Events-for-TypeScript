import { EventListBase } from "ste-core";
import { EventDispatcher } from "./EventDispatcher";

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
