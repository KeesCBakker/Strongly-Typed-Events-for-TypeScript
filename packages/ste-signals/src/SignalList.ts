import { EventListBase } from "ste-core";
import { SignalDispatcher } from "./SignalDispatcher";

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
