/*!
 * Strongly Typed Events for TypeScript
 * https://github.com/KeesCBakker/StronlyTypedEvents/
 * http://keestalkstech.com
 *
 * Copyright Kees C. Bakker / KeesTalksTech
 * Released under the MIT license
 */

interface IEvent<TSender, TArgs> {

    subscribe(fn: (sender: TSender, args: TArgs) => void): void;

    unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
}

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

class NamedEventDispatch<TSender, TArgs> extends EventDispatcher<TSender, TArgs>
{
    private _name: string;

    get name(): string {
        return this._name;
    }

    constructor(name: string) {
        super();

        this._name = name;
    }
}

class EventList<TSender, TArgs> {

    private _events: { [name: string]: NamedEventDispatch<TSender, TArgs>; } = {};

    get(name: string): NamedEventDispatch<TSender, TArgs> {

        let event = this._events[name];

        if (event) {
            return event;
        }

        event = new NamedEventDispatch<TSender, TArgs>(name);
        this._events[name] = event;
        return event;
    }
}
