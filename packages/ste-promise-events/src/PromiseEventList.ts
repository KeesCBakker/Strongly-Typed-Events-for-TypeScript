import { EventListBase } from "ste-core";
import { PromiseEventDispatcher } from "./PromiseEventDispatcher";

/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */

export class PromiseEventList<TSender, TArgs> extends EventListBase<
    PromiseEventDispatcher<TSender, TArgs>
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
    protected createDispatcher(): PromiseEventDispatcher<TSender, TArgs> {
        return new PromiseEventDispatcher<TSender, TArgs>();
    }
}
