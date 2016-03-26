/*!
 * StronglyTypedEvents for TypeScript
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
        this._subscriptions.push(fn);
    }

    unsubscribe(fn: (sender: TSender, args: TArgs) => void): void {
        var i = this._subscriptions.indexOf(fn);
        if (i > -1) {
            this._subscriptions.splice(i, 1);
        }
    }

    dispatch(sender: TSender, args: TArgs): void {
        for (var i = 0; i < this._subscriptions.length; i++) {
            var handler = this._subscriptions[i];
            if (handler != null) {
                handler(sender, args);
            }
        }
    }
}
