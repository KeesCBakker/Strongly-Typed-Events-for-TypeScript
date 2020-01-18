# Strongly Typed Events - Simple events
Simple events are a type of event that will provide an `argument` with data when fired. If you use typescript, you can leverage the support for generics and get strongly typed code.

Need a different type of event? Check out <a href="https://www.npmjs.com/package/strongly-typed-events">the others</a>.

[![Build Status](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg?branch=master)](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript)
[![npm version](https://badge.fury.io/js/ste-signals.svg)](https://badge.fury.io/js/ste-signals)
[![forever](https://david-dm.org/KeesCBakker/ste-core.svg)](https://david-dm.org/KeesCBakker/ste-core) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Subscription made easy
An example says more than a 1000 words. Imagine if you have events like this on your class:
```typescript
let clock = new Clock("Smu", 1000);

//log the name of the clock and the tick argument to the console - this is an event
clock.onClockTick.subscribe((c, n) =>
  console.log(`${c.name} ticked ${n} times.`)
);
```

### Events made easy
So let's look at the implementation from a TypeScript perspective. (Do you program NodeJs without typescript? <a href="https://github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript/blob/master/documentation/HowToUseInNodeJs.md">Check this</a>)

```typescript
import { SimpleEventDispatcher } from "ste-simple-events";

class Clock {
  private _onSequenceTick = new SimpleEventDispatcher<number>();
  private _ticks: number = 0;

  constructor(public name: string, timeout: number) {
    setInterval(() => {
      this._ticks += 1;
      this._onSequenceTick.dispatch(this._ticks);
    }, timeout);
  }

  public get onSequenceTick() {
    return this._onSequenceTick.asEvent();
  }
}
```

Check the <a href="https://github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript/tree/master/documentation">documentation</a> or the <a href="https://github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript/tree/master/examples">examples</a> for more information.

Need more info? Check the <a href="https://github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript">repo</a>.

## Maintenance
This project is maintained by <a href="https://keestalkstech.com/">Kees C. Bakker</a>.