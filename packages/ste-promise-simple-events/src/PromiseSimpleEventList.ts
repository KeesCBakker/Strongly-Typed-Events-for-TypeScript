import { EventListBase } from "ste-core";
import { PromiseSimpleEventDispatcher } from "./PromiseSimpleEventDispatcher";

/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */

export class PromiseSimpleEventList<TArgs> extends EventListBase<
    PromiseSimpleEventDispatcher<TArgs>
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
    protected createDispatcher(): PromiseSimpleEventDispatcher<TArgs> {
        return new PromiseSimpleEventDispatcher<TArgs>();
    }
}
