
import { HandlingBase } from "ste-core"
import { IPromiseEventHandling } from "./IPromiseEventHandling";
import { IPromiseEventHandler } from "./IPromiseEventHandler";
import { PromiseEventList } from "./PromiseEventList";
import { PromiseEventDispatcher } from "./PromiseEventDispatcher";

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class PromiseEventHandlingBase<TSender, TArgs> extends HandlingBase<
    IPromiseEventHandler<TSender, TArgs>,
    PromiseEventDispatcher<TSender, TArgs>,
    PromiseEventList<TSender, TArgs>>
    implements IPromiseEventHandling<TSender, TArgs> {

        constructor(){
            super(new PromiseEventList<TSender, TArgs>())
        }
}

