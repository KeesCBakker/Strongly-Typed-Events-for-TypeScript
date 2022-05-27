import { HandlingBase } from "ste-core";
import type { ISignalHandler, ISignalHandling } from ".";
import { SignalDispatcher } from "./SignalDispatcher";
import { SignalList } from "./SignalList";


/**
 * Extends objects with signal event handling capabilities.
 * 
 * @export
 * @abstract
 * @class SignalHandlingBase
 * @extends {HandlingBase<ISignalHandler, SignalDispatcher, SignalList>}
 * @implements {ISignalHandling}
 */
export abstract class SignalHandlingBase
    extends HandlingBase<ISignalHandler, SignalDispatcher, SignalList>
    implements ISignalHandling {

    /**
     * Creates an instance of SignalHandlingBase.
     * 
     * @memberOf SignalHandlingBase
     */
    constructor() {
        super(new SignalList());
    }
}
