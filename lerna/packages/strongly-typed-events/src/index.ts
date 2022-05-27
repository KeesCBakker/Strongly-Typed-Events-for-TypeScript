/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

export {
    IEventManagement,
    ISubscribable,
    Subscription,
    IBaseEventHandling,
    DispatcherBase,
    DispatcherWrapper,
    EventListBase,
    EventManagement,
    IPropagationStatus,
    DispatchError,
    PromiseSubscription,
    ISubscription,
    PromiseDispatcherBase,
    HandlingBase,
} from "ste-core";

export {
    EventDispatcher,
    EventHandlingBase,
    EventList,
    NonUniformEventList,
    IEventHandling,
    IEvent,
    IEventHandler,
} from "ste-events";

export {
    SimpleEventDispatcher,
    SimpleEventHandlingBase,
    SimpleEventList,
    NonUniformSimpleEventList,
    ISimpleEventHandling,
    ISimpleEvent,
    ISimpleEventHandler,
} from "ste-simple-events";

export {
    SignalDispatcher,
    SignalHandlingBase,
    SignalList,
    ISignalHandling,
    ISignal,
    ISignalHandler,
} from "ste-signals";

export {
    IPromiseEventHandler,
    IPromiseEventHandling,
    IPromiseEvent,
    PromiseEventDispatcher,
    PromiseEventHandlingBase,
    PromiseEventList,
    NonUniformPromiseEventList,
} from "ste-promise-events";

export {
    IPromiseSignalHandling,
    IPromiseSignal,
    IPromiseSignalHandler,
    PromiseSignalDispatcher,
    PromiseSignalHandlingBase,
    PromiseSignalList,
} from "ste-promise-signals";

export {
    PromiseSimpleEventDispatcher,
    PromiseSimpleEventHandlingBase,
    PromiseSimpleEventList,
    NonUniformPromiseSimpleEventList,
    IPromiseSimpleEvent,
    IPromiseSimpleEventHandler,
    IPromiseSimpleEventHandling,
} from "ste-promise-simple-events";
