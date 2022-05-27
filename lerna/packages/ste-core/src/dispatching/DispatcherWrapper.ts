import { ISubscribable, SubscriptionChangeEventHandler } from "..";

/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 * 
 * @export
 * @class DispatcherWrapper
 * @implements {ISubscribable<TEventHandler>}
 * @template TEventHandler The type of event handler.
 */
export class DispatcherWrapper<TEventHandler> implements ISubscribable<TEventHandler> {
    private _subscribe: (fn: TEventHandler) => () => void;
    private _unsubscribe: (fn: TEventHandler) => void;
    private _one: (fn: TEventHandler) => () => void;
    private _has: (fn: TEventHandler) => boolean;
    private _clear: () => void;
    private _count: () => number;
    private _onSubscriptionChange: () => ISubscribable<SubscriptionChangeEventHandler>;

    /**
     * Creates an instance of DispatcherWrapper.
     * @param {ISubscribable<TEventHandler>} dispatcher 
     * 
     * @memberOf DispatcherWrapper
     */
    constructor(dispatcher: ISubscribable<TEventHandler>) {
        this._subscribe = (fn: TEventHandler) => dispatcher.subscribe(fn);
        this._unsubscribe = (fn: TEventHandler) => dispatcher.unsubscribe(fn);
        this._one = (fn: TEventHandler) => dispatcher.one(fn);
        this._has = (fn: TEventHandler) => dispatcher.has(fn);
        this._clear = () => dispatcher.clear();
        this._count = () => dispatcher.count;
        this._onSubscriptionChange = () => dispatcher.onSubscriptionChange;
    }

    /**
     * Triggered when subscriptions are changed (added or removed).
     *
     * @readonly
     * @type {ISubscribable<SubscriptionChangeEventHandler>}
     * @memberOf DispatcherWrapper
     */
    get onSubscriptionChange(): ISubscribable<SubscriptionChangeEventHandler> {
        return this._onSubscriptionChange();
    }

    /**
     * Returns the number of subscriptions.
     *
     * @readonly
     * @type {number}
     * @memberOf DispatcherWrapper
     */
    get count(): number {
        return this._count();
    }

    /**
     * Subscribe to the event dispatcher.
     * 
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns {() => void} A function that unsubscribes the event handler from the event.
     * 
     * @memberOf DispatcherWrapper
     */
    public subscribe(fn: TEventHandler): () => void {
        return this._subscribe(fn);
    }

    /**
     * Subscribe to the event dispatcher.
     * 
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * @returns {() => void} A function that unsubscribes the event handler from the event.
     * 
     * @memberOf DispatcherWrapper
     */
    public sub(fn: TEventHandler): () => void {
        return this.subscribe(fn);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * 
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * 
     * @memberOf DispatcherWrapper
     */
    public unsubscribe(fn: TEventHandler): void {
        this._unsubscribe(fn);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * 
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * 
     * @memberOf DispatcherWrapper
     */
    public unsub(fn: TEventHandler): void {
        this.unsubscribe(fn);
    }

    /**
     * Subscribe once to the event with the specified name.
     * 
     * @returns {() => void} A function that unsubscribes the event handler from the event.
     * 
     * @memberOf DispatcherWrapper
     */
    public one(fn: TEventHandler): () => void {
        return this._one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * 
     * @param {TEventHandler} fn The event handler that is called when the event is dispatched.
     * 
     * @memberOf DispatcherWrapper
     */
    public has(fn: TEventHandler): boolean {
        return this._has(fn);
    }

    /**
     * Clears all the subscriptions.
     * 
     * @memberOf DispatcherWrapper
     */
    public clear(): void {
        this._clear();
    }
}
