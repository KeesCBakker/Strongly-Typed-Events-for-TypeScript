import { ISignalHandling } from "./ISignalHandling";
import { ISignalHandler } from "./ISignalHandler";
import { SignalList } from "./SignalList";

/**
 * Extends objects with signal event handling capabilities.
 */
export abstract class SignalHandlingBase implements ISignalHandling {
    private _events = new SignalList();

    protected get events(): SignalList {
        return this._events;
    }

    /**
     * Subscribes once to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    one(name: string, fn: ISignalHandler): void {
        this._events.get(name).one(fn);
    }

    /**
     * Checks it the event has a subscription for the specified handler.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    has(name: string, fn: ISignalHandler): boolean {
        return this._events.get(name).has(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    subscribe(name: string, fn: ISignalHandler): void {
        this._events.get(name).subscribe(fn);
    }

    /**
     * Subscribes to the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    sub(name: string, fn: ISignalHandler): void {
        this.subscribe(name, fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsubscribe(name: string, fn: ISignalHandler): void {
        this._events.get(name).unsubscribe(fn);
    }

    /**
     * Unsubscribes from the event with the specified name.
     * @param name The name of the event.
     * @param fn The event handler.
     */
    unsub(name: string, fn: ISignalHandler): void {
        this.unsubscribe(name, fn);
    }
}
