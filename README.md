# Strongly Typed Events for TypeScript &ndash; 0.4.0
Add the power of events to your TypeScript projects.

[![Build Status](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg?branch=master)](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript)
[![npm version](https://badge.fury.io/js/strongly-typed-events.svg)](https://badge.fury.io/js/strongly-typed-events)

## Event types
This project gives you the follwing event types:
- `IEvent<TSender, TArgs>` - styled after the way .Net implements events. The sender and the argument are generic, so your code is strong typed. (Since 0.1)
- `ISimpleEvent<TArgs>` - when you need something simpler with only a generic argument. (Since 0.2)
- `ISignal` - for when no data is needed, just the firing of the event is enough. (Since 0.3)

## Events made easy
Code tells more than words, so let's give an example that uses all types:

```
class Clock {

    //implement the events as private dispatchers
    private _onTick = new SignalDispatcher();
    private _onSequenceTick = new SimpleEventDispatcher<number>();
    private _onClockTick = new EventDispatcher<Clock, number>();

    private _ticks: number = 0;

    constructor(public name: string, timeout: number) {
        window.setInterval( () => { 
            this.Tick(); 
        }, timeout);
    }

    private Tick(): void {
        this._ticks += 1;

        //dispath the events
        this._onTick.dispatch();
        this._onSequenceTick.dispatch(this._ticks);
        this._onClockTick.dispatch(this, this._ticks);
    }

    //expose the events as properties:
    
    public get onTick(): ISignal {
        return this._onTick.asEvent();
    }

    public get onSequenceTick() : ISimpleEvent<number>{
        return this._onSequenceTick.asEvent();
    }

    public get onClockTick(): IEvent<Clock, number> {
        return this._onClockTick.asEvent();
    }
}
```

You can subscribe to the events like this:
```
let clock = new Clock('Smu', 1000);

//log the ticks to the console
clock.onTick.subscribe(()=> console.log('Tick!'));

//log the sequence parameter to the console
clock.onSequenceTick.subscribe((s) => console.log(`Sequence: ${s}`));

//log the name of the clock and the tick argument to the console
clock.onClockTick.subscribe((c, n) => console.log(`${c.name} ticked ${n} times.`))
```

Check the <a href="documentation">documentation</a> or the <a href="examples">examples</a> for more information.

## Node me!
Using TypeScript and Node.js? Great, we've got a package for you!

```
npm i strongly-typed-events
```

Using it is easy:

```
/// <reference path="node_modules/strongly-typed-events/StronglyTypedEvents.d.ts" />

let _e = require('strongly-typed-events') as IStronglyTypedEvents;

export class TfsBuildClient {

    private _notifier = _e.createEventDispatcher<TfsBuildClient, IBuildData>();

    public get onNotify() : IEvent<TfsBuildClient, IBuildData>{
        return this._notifier.asEvent();
    }
}
```
<a href="documentation/HowToUseInNodeJs.md#exposed-classes-and-methods">Read more about what objects are exposed.<a/>

## Documentation
This project will help you to add events, event handling en event dispatching to your classes. To get you started, check:

- <a href="documentation/HowToAddAnEventToAClass.md">How to add an event to a class?</a>
- <a href="documentation/HowToAddAnEventToAnInterface.md">How to add an event to an interface?</a>
- <a href="documentation/HowToAddMultipleEventsToAClass.md">How to add multiple events to a class?</a>
- <a href="documentation/HowToAddDynamicNamedEeventsToAClass.md">How to add dynamic named events to a class?</a>
- <a href="documentation/HowToDoAsynchronousEventDispatching.md">How to do asynchronous event dispatching?</a>
- <a href="documentation/OnEventsDispatchersAndLists.md">On events, dispatchers and lists (a general explanation of the system)</a>
- <a href="documentation/HowToUseInNodeJs.md">How to use Strongly Typed Events in Node.js?</a>

## History

#### Version 0.4
Introduced the `one` method on events to subscribe only once. Added `sub` and `unsub` methods as shorthands for `subscribe` and `unsubscribe`. Added a `has` method
to check if a handler has been registered.
Now supports Node.js through npm package: `npm i strongly-typed-events`. Rewrote and split tests.

#### Version 0.3
Introduced signal &ndash; events that contain no data and just fire. The unit tests now support modules. The following objects and features are present in this version:
- `ISignal` &ndash; Event handler function for a signal.
- `SignalDispatcher` &ndash; Dispatcher implementation for signals. Can be used to subscribe, 
unsubscribe or dispatch events. Use the ToEvent() method to expose the event.
- `SignalList` &ndash; Storage class for multiple signals that are accessible by name. Dispatchers are automatically created.
- `SignalHandlingBase` &ndash; Extends objects with signal handling capabilities.

#### Version 0.2
Introduced simple events &ndash; events that only use an arguments object. I've added many base classes and 
interfaces to make sure the base for both type of events are the same. The following objects and features are present in this version:

- `ISimpleEvent<TArgs>` &ndash; Event handler function with a generic argument.
- `SimpleEventDispatcher<TArgs>` &ndash; Dispatcher implementation for simple events. Can be used to subscribe, 
unsubscribe or dispatch events. Use the ToEvent() method to expose the event
- `SimpleEventList<TArgs>` &ndash; Storage class for multiple events that are accessible by name. Events dispatchers are automatically created.
- `SimpleEventHandlingBase<TArgs>` &ndash; Extends objects with simple event handling capabilities.
- Added an `asEvent` method to the dispatchers that will expose only the subsribe / unsubscribe methods. This will prevent
the `dispatch` method from being exposed through the events.
- Added an `dispatchAsync` method to the dispatchers that will execute all subsriptions asynchronously. 
<a href="documentation/HowToDoAsynchronousEventDispatching.md">Check this for more information</a>.

#### Version 0.1
Introducing the events - use a generic sender and a generic argument to dispatch events through your projects. The following 
objects and features are present in this version:

- `IEvent<TSender, TArgs>` &ndash; Event handler function with a generic sender and a generic argument.
- `EventDispatcher<TSender, TArgs>` &ndash; Dispatcher implementation for events. Can be used to subscribe, 
unsubscribe or dispatch events. Use the ToEvent() method to expose the event.
- `EventList<TSender, TArgs>` &ndash; Storage class for multiple events that are accessible by name. Events dispatchers are automatically created.
- `EventHandlingBase<TSender, TArgs>` &ndash; Extends objects with event handling capabilities.
