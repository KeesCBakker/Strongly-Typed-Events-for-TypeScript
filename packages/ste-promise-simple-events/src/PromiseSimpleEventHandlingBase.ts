import { HandlingBase } from "ste-core";
import { IPromiseSimpleEventHandling } from "./IPromiseSimpleEventHandling";
import { IPromiseSimpleEventHandler } from "./IPromiseSimpleEventHandler";
import { PromiseSimpleEventList } from "./PromiseSimpleEventList";
import { PromiseSimpleEventDispatcher } from "./PromiseSimpleEventDispatcher";

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class PromiseSimpleEventHandlingBase<TArgs>
    extends HandlingBase<
        IPromiseSimpleEventHandler<TArgs>,
        PromiseSimpleEventDispatcher<TArgs>,
        PromiseSimpleEventList<TArgs>
    >
    implements IPromiseSimpleEventHandling<TArgs> {
    constructor() {
        super(new PromiseSimpleEventList<TArgs>());
    }
}
