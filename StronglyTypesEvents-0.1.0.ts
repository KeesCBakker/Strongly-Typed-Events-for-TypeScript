/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

/** Models an event with a generic sender and generic arguments */
interface IEvent<TSender, TArgs> {

    subscribe(fn: (sender: TSender, args: TArgs) => void): void;

    unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
}

/** The dispatcher handles the storage of subsciptions and facilitates
 * subscription, unsubscription and dispatching of the event */
class EventDispatcher<TSender, TArgs> implements IEvent<TSender, TArgs> {

    private _subscriptions: Array<(sender: TSender, args: TArgs) => void> = new Array<(sender: TSender, args: TArgs) => void>();

    subscribe(fn: (sender: TSender, args: TArgs) => void): void {
        if (fn) {
            this._subscriptions.push(fn);
        }
    }

    unsubscribe(fn: (sender: TSender, args: TArgs) => void): void {
        let i = this._subscriptions.indexOf(fn);
        if (i > -1) {
            this._subscriptions.splice(i, 1);
        }
    }

    dispatch(sender: TSender, args: TArgs): void {
        for (let handler of this._subscriptions) {
            handler(sender, args);
        }
    }
}

/** Storage class for multiple events that are accessible by name.
 * Events are automatically created. */
class EventList<TSender, TArgs> {

    private _events: { [name: string]: EventDispatcher<TSender, TArgs>; } = {};

    get(name: string): EventDispatcher<TSender, TArgs> {

        let event = this._events[name];

        if (event) {
            return event;
        }

        event = new EventDispatcher<TSender, TArgs>();
        this._events[name] = event;
        return event;
    }

    remove(name: string): void {
        this._events[name] = null;
    }
}

/** Indicates the object is capable of handling named events. */
interface IEventHandling<TSender, TArgs> {

    subscribe(name: string, fn: (sender: TSender, args: TArgs) => void): void;

    unsubscribe(name: string, fn: (sender: TSender, args: TArgs) => void): void;
}

/** Extends objects with event handling capabilities. */
abstract class EventHandlingBase<TSender, TArgs> implements IEventHandling<TSender, TArgs> {

    private _events: EventList<TSender, TArgs> = new EventList<TSender, TArgs>();

    protected get events(): EventList<TSender, TArgs> {
        return this._events;
    }

    subscribe(name: string, fn: (sender: TSender, args: TArgs) => void): void {
        this._events.get(name).subscribe(fn);
    }

    unsubscribe(name: string, fn: (sender: TSender, args: TArgs) => void): void {
        this._events.get(name).unsubscribe(fn);
    }
}
