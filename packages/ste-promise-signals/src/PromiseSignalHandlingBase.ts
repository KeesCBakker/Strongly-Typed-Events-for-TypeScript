import { HandlingBase } from "ste-core";
import { PromiseSignalDispatcher } from "./PromiseSignalDispatcher";
import { IPromiseSignalHandler } from "./IPromiseSignalHandler";
import { IPromiseSignalHandling } from "./IPromiseSignalHandling";
import { PromiseSignalList } from "./PromiseSignalList";

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class PromiseSignalHandlingBase
    extends HandlingBase<
        IPromiseSignalHandler,
        PromiseSignalDispatcher,
        PromiseSignalList
    >
    implements IPromiseSignalHandling {
    constructor() {
        super(new PromiseSignalList());
    }
}
