import { HandlingBase } from "ste-core";
import { ISimpleEventHandling } from "./ISimpleEventHandling";
import { ISimpleEventHandler } from "./ISimpleEventHandler";
import { SimpleEventList } from "./SimpleEventList";
import { SimpleEventDispatcher } from "./SimpleEventDispatcher";

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class SimpleEventHandlingBase<TArgs>
    extends HandlingBase<
        ISimpleEventHandler<TArgs>,
        SimpleEventDispatcher<TArgs>,
        SimpleEventList<TArgs>
    >
    implements ISimpleEventHandling<TArgs> {
    constructor() {
        super(new SimpleEventList<TArgs>());
    }
}
