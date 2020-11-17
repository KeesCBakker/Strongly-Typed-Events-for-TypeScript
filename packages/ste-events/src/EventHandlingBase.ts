
import { HandlingBase } from "ste-core"
import { IEventHandling } from "./IEventHandling";
import { IEventHandler } from "./IEventHandler";
import { EventList } from "./EventList";
import { EventDispatcher } from "./EventDispatcher";

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class EventHandlingBase<TSender, TArgs> extends HandlingBase<
    IEventHandler<TSender, TArgs>,
    EventDispatcher<TSender, TArgs>,
    EventList<TSender, TArgs>>
    implements IEventHandling<TSender, TArgs> {

        constructor(){
            super(new EventList<TSender, TArgs>())
        }
}

