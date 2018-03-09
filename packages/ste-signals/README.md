# Strongly Typed Events - Signals
Signals are the most barebone of all <a href="https://www.npmjs.com/package/strongly-typed-events">events</a>. They don't contain
any data. They just invoke the registered handler. 

[![Build Status](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript.svg?branch=master)](https://travis-ci.org/KeesCBakker/Strongly-Typed-Events-for-TypeScript)
[![npm version](https://badge.fury.io/js/ste-signals.svg)](https://badge.fury.io/js/ste-signals)
[![forever](https://david-dm.org/KeesCBakker/ste-core.svg)](https://david-dm.org/KeesCBakker/ste-core) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


### Subscription made easy
An example says more than a 1000 words. Imagine if you have events like this on your class:
```typescript
let clock = new Clock("Smu", 1000);

//log the ticks to the console - this is a signal event
clock.onTick.subscribe(() => console.log("Tick!"));

```

### Events made easy
So let's look at the implementation from a TypeScript perspective. (Do you program NodeJs without typescript? <a href="../../documentation/HowToUseInNodeJs.md">Check this</a>)

```typescript
import { SignalDispatcher, SimpleEventDispatcher, EventDispatcher } from "ste-signals";

class Clock {
  private _onTick = new SignalDispatcher();
  private _ticks: number = 0;

  constructor(public name: string, timeout: number) {
    setInterval(() => {
      this._ticks += 1;
      this._onTick.dispatch();
    }, timeout);
  }

  public get onTick() {
    return this._onTick.asEvent();
  }
}
```

Check the <a href="../../documentation">documentation</a> or the <a href="../../examples">examples</a> for more information.

Need more info? Check the <a href="https://github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript">repo</a>.