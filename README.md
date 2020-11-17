# Strongly Typed Events
Add the power of events to your projects. We even have 3 flavors for you.

[![Build Status](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg?branch=master)](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript)
[![npm version](https://badge.fury.io/js/strongly-typed-events.svg)](https://badge.fury.io/js/strongly-typed-events)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Event types
This project gives you the following event types:
- **Events** - styled after the way .Net implements events. With each event you'll get a `sender` and an `argument` object. If you use typescript, you can implement them using generics.<br/>`npm install ste-events` or `npm install ste-promise-events` for event handlers that support `Promise`.
- **Simple events** - basically the same thing, with only an argument.<br/>`npm install ste-simple-events` or `npm install ste-promise-simple-events` for event handlers that support `Promise`.
- **Signals** - for when no data is needed, just the firing of the event is enough.<br/>`npm install ste-signals` or `npm install ste-promise-signals` for event handlers that support `Promise`.
- You want them all? Just use<br/>`npm install strongly-typed-events`.


### Subscription made easy
An example says more than a 1000 words. Imagine if you have events like this on your class:
```typescript
let clock = new Clock("Smu", 1000);

//log the ticks to the console - this is a signal event
clock.onTick.subscribe(() => console.log("Tick!"));

//log the sequence parameter to the console - this is a simple event
clock.onSequenceTick.subscribe(s => console.log(`Sequence: ${s}`));

//log the name of the clock and the tick argument to the console - this is an event
clock.onClockTick.subscribe((c, n) =>
  console.log(`${c.name} ticked ${n} times.`)
);
```

### Events made easy
So let's look at the implementation from a TypeScript perspective. (Do you program NodeJs without typescript? <a href="documentation/HowToUseInNodeJs.md">Check this</a>.)

```typescript
import { SignalDispatcher, SimpleEventDispatcher, EventDispatcher } from "strongly-typed-events";

class Clock {
  private _onTick = new SignalDispatcher();
  private _onSequenceTick = new SimpleEventDispatcher<number>();
  private _onClockTick = new EventDispatcher<Clock, number>();
  private _ticks: number = 0;

  constructor(public name: string, timeout: number) {
    setInterval(() => {
      this._ticks += 1;
      this._onTick.dispatch();
      this._onSequenceTick.dispatch(this._ticks);
      this._onClockTick.dispatch(this, this._ticks);
    }, timeout);
  }

  public get onTick() {
    return this._onTick.asEvent();
  }

  public get onSequenceTick() {
    return this._onSequenceTick.asEvent();
  }

  public get onClockTick() {
    return this._onClockTick.asEvent();
  }
}
```

### Stopping events
You can stop events from being propagated.

```typescript
let dispatcher = new SignalDispatcher();

  let a = 0;
  dispatcher.sub(ev => {
    a++;
    if (a > 2) {
      ev.stopPropagation();
    }
  });

  let b = 0;
  dispatcher.sub(() => { b++; });

  dispatcher.dispatch();
  dispatcher.dispatch();
  dispatcher.dispatch();
  dispatcher.dispatch();

  // a should be 4, because 4 dispatches are done.");
  // b should be 2, because events after the 2nd dispatch are stopped."

```

Check the <a href="documentation">documentation</a> or the <a href="examples">examples</a> for more information.

## Documentation
This project will help you to add events, event handling en event dispatching to your classes. To get you started, check:

- <a href="documentation/HowToAddAnEventToAClass.md">How to add an event to a class?</a>
- <a href="documentation/HowToAddAnEventToAnInterface.md">How to add an event to an interface?</a>
- <a href="documentation/HowToAddMultipleEventsToAClass.md">How to add multiple events to a class?</a>
- <a href="documentation/HowToAddDynamicNamedEeventsToAClass.md">How to add dynamic named events to a class?</a>
- <a href="documentation/HowToDoAsynchronousEventDispatching.md">How to do asynchronous event dispatching?</a>
- <a href="documentation/OnEventsDispatchersAndLists.md">On events, dispatchers and lists (a general explanation of the system)</a>
- <a href="documentation/HowToUseInNodeJs.md">How to use Strongly Typed Events in Node.js?</a>
- <a href="documentation/SomeUnsubStrategies.md">Some unsubscribe strategies</a>

## History
<a href="documentation/history.md">Click here for more history...</a>

## Packages
Want a smaller package? Check out on of these:

|Package|Description|
|-------|-----------|
|<a href="https://www.npmjs.com/package/ste-core">`ste-core`</a>|Package that contains all the building blocks for the creation of events. The dispatcher implementation is its main hero.|
|<a href="https://www.npmjs.com/package/ste-events">`ste-events`</a> or <a href="https://www.npmjs.com/package/ste-promise-events">`ste-promise-events`</a>|Events that are modeled after .Net with a `sender` and `argument`. If you use typescript, you can leverage the support for generics and get strongly typed code.|
|<a href="https://www.npmjs.com/package/ste-simple-events">`ste-simple-events`</a> or <a href="https://www.npmjs.com/package/ste-promise-simple-events">`ste-promise-simple-events`</a>|A simpler version of the `ste-event`-event. No sender, just an argument.|
|<a href="https://www.npmjs.com/package/ste-signals">`ste-signals`</a> or <a href="https://www.npmjs.com/package/ste-promise-signals">`ste-promise-signals`</a>|A signal is even simpler, it is just a callback for when you need to be alerted without any scope.|
|<a href="https://www.npmjs.com/package/strongly-typed-events">`strongly-typed-events`</a>|This package includes everything.|
|<a href="https://www.npmjs.com/package/ste-browser">`ste-browser`</a>|Helps to host events in the browser.|
<br/>

## Maintenance
This project is maintained by <a href="https://keestalkstech.com/">Kees C. Bakker</a>.