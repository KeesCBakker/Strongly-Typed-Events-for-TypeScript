/*!
 * Strongly Typed Events for TypeScript - 1.0.1
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
/**
 * Event handler function with a generic sender and a generic argument.
 */
export interface IEventHandler<TSender, TArgs> {
    /**
      * @sender The sender.
      * @args The argument.
      */
    (sender: TSender, args: TArgs): any;
}
/**
 * Event handler function with a generic argument
 */
export interface ISimpleEventHandler<TArgs> {
    /**
      * @args The argument.
      */
    (args: TArgs): any;
}
/**
 * Event handler function without arguments
 */
export interface ISignalHandler {
    (): any;
}
/**
 * Indicates the object implements generic subscriptions.
 */
export interface ISubscribable<THandlerType> {
    /**
     * Subscribe to the event.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    subscribe(fn: THandlerType): () => void;
    /**
     * Subscribe to the event.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    sub(fn: THandlerType): () => void;
    /**
     * Unsubscribe from the event.
     * @param fn The event handler that will be unsubsribed from the event.
     */
    unsubscribe(fn: THandlerType): void;
    /**
     * Unsubscribe from the event.
     * @param fn The event handler that will be unsubsribed from the event.
     */
    unsub(fn: THandlerType): void;
    /**
     * Subscribes to the event only once.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    one(fn: THandlerType): () => void;
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn: THandlerType): boolean;
    /**
     * Clears all the subscriptions.
     */
    clear(): void;
}
/**
 * Models an event with a generic sender and generic argument.
 */
export interface IEvent<TSender, TArgs> extends ISubscribable<IEventHandler<TSender, TArgs>> {
}
/**
 * Models a simple event with a generic argument.
 */
export interface ISimpleEvent<TArgs> extends ISubscribable<ISimpleEventHandler<TArgs>> {
}
/**
 * Models a signal. This type of events has no arguments.
 * @interface ISignalHandler
 * @extends {ISubscribable<ISignalHandler>}
 */
export interface ISignal extends ISubscribable<ISignalHandler> {
}
/**
 * Base interface for event handling.
 */
export interface IBaseEventHandling<TEventHandler> {
    /**
     * Subscribe to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(name: string, fn: TEventHandler): void;
    /**
     * Subscribe to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    sub(name: string, fn: TEventHandler): void;
    /**
     * Unsubscribe from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(name: string, fn: TEventHandler): void;
    /**
     * Unsubscribe from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsub(name: string, fn: TEventHandler): void;
    /**
     * Subscribe once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    one(name: string, fn: TEventHandler): void;
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: TEventHandler): boolean;
}
/**
 * Indicates the object is capable of handling named events.
 */
export interface IEventHandling<TSender, TArgs> extends IBaseEventHandling<IEventHandler<TSender, TArgs>> {
}
/**
 * Indicates the object is capable of handling named simple events.
 */
export interface ISimpleEventHandling<TArgs> extends IBaseEventHandling<ISimpleEventHandler<TArgs>> {
}
/**
 * Indicates the object is capable of handling named signals.
 */
export interface ISignalHandling extends IBaseEventHandling<ISignalHandler> {
}
/**
 * Stores a handler. Manages execution meta data.
 * @class Subscription
 * @template TEventHandler
 */
export declare class Subscription<TEventHandler> {
    handler: TEventHandler;
    isOnce: boolean;
    /**
     * Indicates if the subscription has been executed before.
     */
    isExecuted: boolean;
    /**
     * Creates an instance of Subscription.
     *
     * @param {TEventHandler} handler The handler for the subscription.
     * @param {boolean} isOnce Indicates if the handler should only be executed` once.
     */
    constructor(handler: TEventHandler, isOnce: boolean);
    /**
     * Executes the handler.
     *
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    execute(executeAsync: boolean, scope: any, args: IArguments): void;
}
/**
 * Base class for implementation of the dispatcher. It facilitates the subscribe
 * and unsubscribe methods based on generic handlers. The TEventType specifies
 * the type of event that should be exposed. Use the asEvent to expose the
 * dispatcher as event.
 */
export declare abstract class DispatcherBase<TEventHandler> implements ISubscribable<TEventHandler> {
    private _wrap;
    private _subscriptions;
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    subscribe(fn: TEventHandler): () => void;
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    sub(fn: TEventHandler): () => void;
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    one(fn: TEventHandler): () => void;
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn: TEventHandler): boolean;
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    unsubscribe(fn: TEventHandler): void;
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    unsub(fn: TEventHandler): void;
    /**
     * Generic dispatch will dispatch the handlers with the given arguments.
     *
     * @protected
     * @param {boolean} executeAsync True if the even should be executed async.
     * @param {*} The scope the scope of the event.
     * @param {IArguments} args The arguments for the event.
     */
    protected _dispatch(executeAsync: boolean, scope: any, args: IArguments): void;
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent(): ISubscribable<TEventHandler>;
    /**
     * Clears all the subscriptions.
     */
    clear(): void;
}
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 */
export declare class EventDispatcher<TSender, TArgs> extends DispatcherBase<IEventHandler<TSender, TArgs>> implements IEvent<TSender, TArgs> {
    /**
     * Creates a new EventDispatcher instance.
     */
    constructor();
    /**
     * Dispatches the event.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatch(sender: TSender, args: TArgs): void;
    /**
     * Dispatches the events thread.
     * @param sender The sender.
     * @param args The arguments object.
     */
    dispatchAsync(sender: TSender, args: TArgs): void;
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent(): IEvent<TSender, TArgs>;
}
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 */
export declare class SimpleEventDispatcher<TArgs> extends DispatcherBase<ISimpleEventHandler<TArgs>> implements ISimpleEvent<TArgs> {
    /**
     * Creates a new SimpleEventDispatcher instance.
     */
    constructor();
    /**
     * Dispatches the event.
     * @param args The arguments object.
     */
    dispatch(args: TArgs): void;
    /**
     * Dispatches the events thread.
     * @param args The arguments object.
     */
    dispatchAsync(args: TArgs): void;
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent(): ISimpleEvent<TArgs>;
}
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a signal event.
 */
export declare class SignalDispatcher extends DispatcherBase<ISignalHandler> implements ISignal {
    /**
     * Creates a new SignalDispatcher instance.
     */
    constructor();
    /**
     * Dispatches the signal.
     */
    dispatch(): void;
    /**
     * Dispatches the signal threaded.
     */
    dispatchAsync(): void;
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent(): ISignal;
}
/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
export declare class DispatcherWrapper<THandler> implements ISubscribable<THandler> {
    private _subscribe;
    private _unsubscribe;
    private _one;
    private _has;
    private _clear;
    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    constructor(dispatcher: ISubscribable<THandler>);
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    subscribe(fn: THandler): () => void;
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    sub(fn: THandler): () => void;
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    unsubscribe(fn: THandler): void;
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    unsub(fn: THandler): void;
    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    one(fn: THandler): () => void;
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    has(fn: THandler): boolean;
    /**
     * Clears all the subscriptions.
     */
    clear(): void;
}
/**
 * Base class for event lists classes. Implements the get and remove.
 */
export declare abstract class EventListBase<TEventDispatcher> {
    private _events;
    /**
     * Gets the dispatcher associated with the name.
     * @param name The name of the event.
     */
    get(name: string): TEventDispatcher;
    /**
     * Removes the dispatcher associated with the name.
     * @param name The name of the event.
     */
    remove(name: string): void;
    /**
     * Creates a new dispatcher instance.
     */
    protected abstract createDispatcher(): TEventDispatcher;
}
/**
 * Storage class for multiple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export declare class EventList<TSender, TArgs> extends EventListBase<EventDispatcher<TSender, TArgs>> {
    /**
     * Creates a new EventList instance.
     */
    constructor();
    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): EventDispatcher<TSender, TArgs>;
}
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export declare class SimpleEventList<TArgs> extends EventListBase<SimpleEventDispatcher<TArgs>> {
    /**
     * Creates a new SimpleEventList instance.
     */
    constructor();
    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SimpleEventDispatcher<TArgs>;
}
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
export declare class SignalList extends EventListBase<SignalDispatcher> {
    /**
     * Creates a new SignalList instance.
     */
    constructor();
    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SignalDispatcher;
}
/**
 * Extends objects with event handling capabilities.
 */
export declare abstract class EventHandlingBase<TSender, TArgs> implements IEventHandling<TSender, TArgs> {
    private _events;
    /**
     * Gets the list with all the event dispatchers.
     */
    protected readonly events: EventList<TSender, TArgs>;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: IEventHandler<TSender, TArgs>): void;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: IEventHandler<TSender, TArgs>): void;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: IEventHandler<TSender, TArgs>): void;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: IEventHandler<TSender, TArgs>): void;
    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: IEventHandler<TSender, TArgs>): void;
    /**
     * Subscribes to once the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: IEventHandler<TSender, TArgs>): boolean;
}
/**
 * Extends objects with simple event handling capabilities.
 */
export declare abstract class SimpleEventHandlingBase<TArgs> implements ISimpleEventHandling<TArgs> {
    private _events;
    protected readonly events: SimpleEventList<TArgs>;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: ISimpleEventHandler<TArgs>): void;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: ISimpleEventHandler<TArgs>): void;
    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: ISimpleEventHandler<TArgs>): void;
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: ISimpleEventHandler<TArgs>): boolean;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISimpleEventHandler<TArgs>): void;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: ISimpleEventHandler<TArgs>): void;
}
/**
 * Extends objects with signal event handling capabilities.
 */
export declare abstract class SignalHandlingBase implements ISignalHandling {
    private _events;
    protected readonly events: SignalList;
    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: ISignalHandler): void;
    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: ISignalHandler): boolean;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: ISignalHandler): void;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: ISignalHandler): void;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISignalHandler): void;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: ISignalHandler): void;
}
export declare function createEventDispatcher<TSender, TArgs>(): EventDispatcher<TSender, TArgs>;
export declare function createEventList<TSender, TArgs>(): EventList<TSender, TArgs>;
export declare function createSimpleEventDispatcher<TArgs>(): SimpleEventDispatcher<TArgs>;
export declare function createSimpleEventList<TArgs>(): SimpleEventList<TArgs>;
export declare function createSignalDispatcher(): SignalDispatcher;
export declare function createSignalList(): SignalList;
declare var StronglyTypedEventsStatic: {
    EventList: typeof EventList;
    SimpleEventList: typeof SimpleEventList;
    SignalList: typeof SignalList;
    createEventList: <TSender, TArgs>() => EventList<TSender, TArgs>;
    createSimpleEventList: <TArgs>() => SimpleEventList<TArgs>;
    createSignalList: () => SignalList;
    EventDispatcher: typeof EventDispatcher;
    SimpleEventDispatcher: typeof SimpleEventDispatcher;
    SignalDispatcher: typeof SignalDispatcher;
    EventHandlingBase: typeof EventHandlingBase;
    SimpleEventHandlingBase: typeof SimpleEventHandlingBase;
    SignalHandlingBase: typeof SignalHandlingBase;
    createEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSimpleEventDispatcher: <TArgs>() => SimpleEventDispatcher<TArgs>;
    createSignalDispatcher: () => SignalDispatcher;
    EventListBase: typeof EventListBase;
    DispatcherBase: typeof DispatcherBase;
    DispatcherWrapper: typeof DispatcherWrapper;
};
export declare var IStronglyTypedEvents: {
    EventList: typeof EventList;
    SimpleEventList: typeof SimpleEventList;
    SignalList: typeof SignalList;
    createEventList: <TSender, TArgs>() => EventList<TSender, TArgs>;
    createSimpleEventList: <TArgs>() => SimpleEventList<TArgs>;
    createSignalList: () => SignalList;
    EventDispatcher: typeof EventDispatcher;
    SimpleEventDispatcher: typeof SimpleEventDispatcher;
    SignalDispatcher: typeof SignalDispatcher;
    EventHandlingBase: typeof EventHandlingBase;
    SimpleEventHandlingBase: typeof SimpleEventHandlingBase;
    SignalHandlingBase: typeof SignalHandlingBase;
    createEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSimpleEventDispatcher: <TArgs>() => SimpleEventDispatcher<TArgs>;
    createSignalDispatcher: () => SignalDispatcher;
    EventListBase: typeof EventListBase;
    DispatcherBase: typeof DispatcherBase;
    DispatcherWrapper: typeof DispatcherWrapper;
};
export default StronglyTypedEventsStatic;
