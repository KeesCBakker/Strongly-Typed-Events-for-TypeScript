import { HandlingBase } from "ste-core";
import {
    ISignalHandler,
    ISignalHandling,
    SignalDispatcher,
    SignalList,
} from ".";

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class SignalHandlingBase
    extends HandlingBase<ISignalHandler, SignalDispatcher, SignalList>
    implements ISignalHandling {
    constructor() {
        super(new SignalList());
    }
}
