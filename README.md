# Strongly Typed Events
Add the power of events to your projects. We even have 3 flavors for you.

[![Build Status](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg?branch=master)](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript)
[![npm version](https://badge.fury.io/js/strongly-typed-events.svg)](https://badge.fury.io/js/strongly-typed-events)
[![forever](https://david-dm.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg)](https://david-dm.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Event types
This project gives you the following event types:
- **Events** - styled after the way .Net implements events. With each event you'll get a `sender` and an `argument` object. If you use typescript, you can implement them using generics. `npm install ste-events --save`
- **Simple events** - basically the same thing, with only an argument. `npm install ste-simple-events --save`
- **Signals** - for when no data is needed, just the firing of the event is enough. `npm install ste-signals --save`
- You want them all? Just use `npm install strongly-typed-events --save`.

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

# History

#### Version 1.3
We transformed the single package to 5 packages:

|Package|Description|
|-------|-----------|
|`ste-core`|Package that contains all the building blocks for the creation of events. The dispatcher implementation is its main hero.|
|`ste-events`|Events that are modeled after .Net with a `sender` and `argument`. If you use typescript, you can leverage the support for generics and get strongly typed code.|
|`ste-simple-events`|A simpler version of the `ste-event`-event. No sender, just an argument.|
|`ste-signals`|A signal is even simpler, it is just a callback for when you need to be alerted without any scope.|
|`strongly-typed-events`|This package all the events.|
|`ste-browser`|Compiled JavaScript files for the browser.|

#### Version 1.2
Added `ev.stopPropagation` and `ev.unsub()` to aid in event management. Each event type has
an extra parameter that can be used to manage the event:
```typescript
//log the name of the clock and the tick argument to the console - this is an event
clock.onClockTick.subscribe((c, n, ev) =>

  console.log(`${c.name} ticked ${n} times.`)

  //stop further event propagation:
  ev.stopPropagation();

  //unsubscribes the event handler that caused the event:
  ev.unsub();
);
```

#### Version 1.1
Removed the static. Internal restructuring of the package. Removed default exports, all exports are now named. _This is a breaking change_.
An unsubscribe function is now returned when registering a subscription: `let unsub = x.sub(x => {}); unsub();`.

#### Version 1.0
Added default exports. Removed emulation through window. 

#### Version 0.5
Restructured includes for 'normal' web applications. Using `import` / `export` mechanisme. Emulating `exports` and `require` nodes through the `window` object for web.

#### Version 0.4
Introduced the `one` method on events to subscribe only once. Added `sub` and `unsub` methods as shorthands for `subscribe` and `unsubscribe`. Added a `has` method to check if a handler has been registered.
Now supports Node.js through npm package: `npm i strongly-typed-events`. Rewrote and split tests.<br/>
0.4.2: Introduced the `clear` method on events to clear all subscriptions.

<a href="documentation/history.md">Click here for more history...</a>
