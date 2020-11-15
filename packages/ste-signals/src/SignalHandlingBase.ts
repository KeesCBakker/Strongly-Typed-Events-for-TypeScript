import { SignalDispatcher } from './SignalDispatcher';
import { HandlingBase } from 'ste-core';

import { ISignalHandling } from "./ISignalHandling";
import { ISignalHandler } from "./ISignalHandler";
import { SignalList } from "./SignalList";

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class SignalHandlingBase extends HandlingBase<
    ISignalHandler,
    SignalDispatcher,
    SignalList>
    implements ISignalHandling {

        constructor(){
            super(new SignalList())
        }
}



