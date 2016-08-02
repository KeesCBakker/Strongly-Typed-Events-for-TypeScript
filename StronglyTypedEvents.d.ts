/*!
 * Strongly Typed Events for TypeScript - 0.3.1
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */
/**
 * Event handler function with a generic sender and a generic argument.
 */
interface IEventHandler<TSender, TArgs> {
    /**
      * @sender The sender.
      * @args The argument.
      */
    (sender: TSender, args: TArgs): void;
}
/**
 * Event handler function with a generic argument
 */
interface ISimpleEventHandler<TArgs> {
    /**
      * @args The argument.
      */
    (args: TArgs): void;
}
/**
 * Event handler function without arguments
 */
interface ISignalHandler {
    (): void;
}
/**
 * Indicates the object implements generic subscriptions.
 */
interface ISubscribable<THandlerType> {
    /**
     * Subscribe to the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(fn: THandlerType): void;
    /**
     * Unsubscribe from the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(fn: THandlerType): void;
}
/**
 * Models an event with a generic sender and generic argument.
 */
interface IEvent<TSender, TArgs> extends ISubscribable<IEventHandler<TSender, TArgs>> {
}
/**
 * Models a simple event with a generic argument.
 */
interface ISimpleEvent<TArgs> extends ISubscribable<ISimpleEventHandler<TArgs>> {
}
/**
 * Models a signal. This type of events has no arguments.
 * @interface ISignalHandler
 * @extends {ISubscribable<ISignalHandler>}
 */
interface ISignal extends ISubscribable<ISignalHandler> {
}
/**
 * Base interface for event handling.
 */
interface IBaseEventHandling<TEventHandler> {
    /**
     * Subscribe to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(name: string, fn: TEventHandler): void;
    /**
     * Unsubscribe from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler that is will be unsubsribed from the event.
     */
    unsubscribe(name: string, fn: TEventHandler): void;
}
/**
 * Indicates the object is capable of handling named events.
 */
interface IEventHandling<TSender, TArgs> extends IBaseEventHandling<IEventHandler<TSender, TArgs>> {
}
/**
 * Indicates the object is capable of handling named simple events.
 */
interface ISimpleEventHandling<TArgs> extends IBaseEventHandling<ISimpleEventHandler<TArgs>> {
}
/**
 * Indicates the object is capable of handling named signals.
 */
interface ISignalHandling extends IBaseEventHandling<ISignalHandler> {
}
declare abstract class DispatcherBase<TEventHandler> implements ISubscribable<TEventHandler> {
    private _wrap;
    protected _subscriptions: Array<TEventHandler>;
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(fn: TEventHandler): void;
    /**
     * Unsubscribes the handler from the dispatcher.
     * @param fn The event handler.
     */
    unsubscribe(fn: TEventHandler): void;
    /**
     * Creates an event from the dispatcher. Will return the dispatcher
     * in a wrapper. This will prevent exposure of any dispatcher methods.
     */
    asEvent(): ISubscribable<TEventHandler>;
}
/**
 * Dispatcher implementation for events. Can be used to subscribe, unsubscribe
 * or dispatch events. Use the ToEvent() method to expose the event.
 */
declare class EventDispatcher<TSender, TArgs> extends DispatcherBase<IEventHandler<TSender, TArgs>> implements IEvent<TSender, TArgs> {
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
    private excuteAsync(sender, args, handler);
}
/**
 * The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of a simple event
 */
declare class SimpleEventDispatcher<TArgs> extends DispatcherBase<ISimpleEventHandler<TArgs>> implements ISimpleEvent<TArgs> {
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
    private excuteAsync(args, handler);
}
declare class SignalDispatcher extends DispatcherBase<ISignalHandler> implements ISignal {
    /**
     * Dispatches the signal.
     */
    dispatch(): void;
    /**
     * Dispatches the signal threaded.
     */
    dispatchAsync(): void;
    private excuteAsync(handler);
}
/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
declare class DispatcherWrapper<THandlerType> implements ISubscribable<THandlerType> {
    private _subscribe;
    private _unsubscribe;
    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    constructor(dispatcher: ISubscribable<THandlerType>);
    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    subscribe(fn: THandlerType): void;
    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    unsubscribe(fn: THandlerType): void;
}
/**
 * Base class for event lists classes. Implements the get and remove.
 */
declare abstract class EventListBase<TEventDispatcher> {
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
declare class EventList<TSender, TArgs> extends EventListBase<EventDispatcher<TSender, TArgs>> {
    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): EventDispatcher<TSender, TArgs>;
}
/**
 * Storage class for multiple simple events that are accessible by name.
 * Events dispatchers are automatically created.
 */
declare class SimpleEventList<TArgs> extends EventListBase<SimpleEventDispatcher<TArgs>> {
    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SimpleEventDispatcher<TArgs>;
}
/**
 * Storage class for multiple signal events that are accessible by name.
 * Events dispatchers are automatically created.
 */
declare class SignalList extends EventListBase<SignalDispatcher> {
    /**
     * Creates a new dispatcher instance.
     */
    protected createDispatcher(): SignalDispatcher;
}
/**
 * Extends objects with event handling capabilities.
 */
declare abstract class EventHandlingBase<TSender, TArgs> implements IEventHandling<TSender, TArgs> {
    private _events;
    /**
     * Gets the list with all the event dispatchers.
     */
    protected events: EventList<TSender, TArgs>;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: IEventHandler<TSender, TArgs>): void;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: IEventHandler<TSender, TArgs>): void;
}
/**
 * Extends objects with simple event handling capabilities.
 */
declare abstract class SimpleEventHandlingBase<TArgs> implements ISimpleEventHandling<TArgs> {
    private _events;
    protected events: SimpleEventList<TArgs>;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: ISimpleEventHandler<TArgs>): void;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISimpleEventHandler<TArgs>): void;
}
/**
 * Extends objects with signal event handling capabilities.
 */
declare abstract class SignalHandlingBase implements ISignalHandling {
    private _events;
    protected events: SignalList;
    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: ISignalHandler): void;
    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISignalHandler): void;
}
interface IStronglyTypedEvents {
    EventList: <TSender, TArgs>() => EventList<TSender, TArgs>;
    SimpleEventList: <TArgs>() => SimpleEventList<TArgs>;
    SignalList: () => SignalList;
    EventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    SimpleEventDispatcher: <TArgs>() => SimpleEventDispatcher<TArgs>;
    SignalDispatcher: () => SignalDispatcher;
    EventHandlingBase: <TSender, TArgs>() => EventHandlingBase<TSender, TArgs>;
    SimpleEventHandlingBase: <TArgs>() => SimpleEventHandlingBase<TArgs>;
    SignalHandlingBase: () => SignalHandlingBase;
    createEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSimpleEventDispatcher: <TSender, TArgs>() => EventDispatcher<TSender, TArgs>;
    createSignalDispatcher: () => SignalDispatcher;
    EventListBase: <TEventDispatcher>() => EventListBase<TEventDispatcher>;
    DispatcherBase: <TEventHandler>() => DispatcherBase<TEventHandler>;
    DispatcherWrapper: <THandlerType>() => DispatcherWrapper<THandlerType>;
}
declare function createEventDispatcher<TSender, TArgs>(): EventDispatcher<TSender, TArgs>;
declare function createSimpleEventDispatcher<TArgs>(): SimpleEventDispatcher<TArgs>;
declare function createSignalDispatcher(): SignalDispatcher;
declare var define: any;
declare var module: any;
