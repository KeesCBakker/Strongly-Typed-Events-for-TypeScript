import { EventListBase } from "ste-core";
import { SimpleEventDispatcher } from "./SimpleEventDispatcher";

/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */

export class SimpleEventList<TArgs> extends EventListBase<
    SimpleEventDispatcher<TArgs>
> {
    /**
     * Creates a new SimpleEventList instance.
     */
    constructor() {
        super();
    }

    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SimpleEventDispatcher<TArgs> {
        return new SimpleEventDispatcher<TArgs>();
    }
}
