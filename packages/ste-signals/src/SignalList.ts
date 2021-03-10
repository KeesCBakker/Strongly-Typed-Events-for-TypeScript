import { EventListBase } from "ste-core";
import { SignalDispatcher } from ".";

/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 *
 * @export
 * @class SignalList
 * @extends {EventListBase<SignalDispatcher>}
 */
export class SignalList extends EventListBase<SignalDispatcher> {
    /**
     * Creates an instance of SignalList.
     *
     * @memberOf SignalList
     */
    constructor() {
        super();
    }

    /**
     * Creates a new dispatcher instance.
     *
     * @protected
     * @returns {SignalDispatcher}
     *
     * @memberOf SignalList
     */
    protected createDispatcher(): SignalDispatcher {
        return new SignalDispatcher();
    }
}
