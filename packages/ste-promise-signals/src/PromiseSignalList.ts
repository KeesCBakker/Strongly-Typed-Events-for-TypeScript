import { EventListBase } from "ste-core";
import { PromiseSignalDispatcher } from ".";

/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export class PromiseSignalList extends EventListBase<PromiseSignalDispatcher> {
    /**
     * Creates a new SignalList instance.
     */
    constructor() {
        super();
    }

    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): PromiseSignalDispatcher {
        return new PromiseSignalDispatcher();
    }
}
