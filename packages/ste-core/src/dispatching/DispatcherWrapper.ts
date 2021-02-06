import { ISubscribable, SubscriptionChangeEventHandler } from "..";

/**
 * Hides the implementation of the event dispatcher. Will expose methods that
 * are relevent to the event.
 */
export class DispatcherWrapper<THandler> implements ISubscribable<THandler> {
    private _subscribe: (fn: THandler) => () => void;
    private _unsubscribe: (fn: THandler) => void;
    private _one: (fn: THandler) => () => void;
    private _has: (fn: THandler) => boolean;
    private _clear: () => void;
    private _count: () => number;
    private _onSubscriptionChange: () => ISubscribable<SubscriptionChangeEventHandler>;

    /**
     * Creates a new EventDispatcherWrapper instance.
     * @param dispatcher The dispatcher.
     */
    constructor(dispatcher: ISubscribable<THandler>) {
        this._subscribe = (fn: THandler) => dispatcher.subscribe(fn);
        this._unsubscribe = (fn: THandler) => dispatcher.unsubscribe(fn);
        this._one = (fn: THandler) => dispatcher.one(fn);
        this._has = (fn: THandler) => dispatcher.has(fn);
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
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    public subscribe(fn: THandler): () => void {
        return this._subscribe(fn);
    }

    /**
     * Subscribe to the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     * @returns A function that unsubscribes the event handler from the event.
     */
    public sub(fn: THandler): () => void {
        return this.subscribe(fn);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public unsubscribe(fn: THandler): void {
        this._unsubscribe(fn);
    }

    /**
     * Unsubscribe from the event dispatcher.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public unsub(fn: THandler): void {
        this.unsubscribe(fn);
    }

    /**
     * Subscribe once to the event with the specified name.
     * @param fn The event handler that is called when the event is dispatched.
     */
    public one(fn: THandler): () => void {
        return this._one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param fn The event handler.
     */
    public has(fn: THandler): boolean {
        return this._has(fn);
    }

    /**
     * Clears all the subscriptions.
     */
    public clear(): void {
        this._clear();
    }
}
