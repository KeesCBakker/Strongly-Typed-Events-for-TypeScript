# Strongly Typed Events - Simple events
Simple events are a type of event that will provide an `argument` with data when fired. If you use typescript, you can leverage the support for generics and get strongly typed code.

Need a different type of event? Check out <a href="https://www.npmjs.com/package/strongly-typed-events">the others</a>.

[![npm version](https://badge.fury.io/js/ste-simple-events.svg)](https://badge.fury.io/js/ste-simple-events)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### Subscription made easy
An example says more than a 1000 words. Imagine if you have events like this on your class:
```typescript
let clock = new Clock("Smu", 1000);

clock.onSequenceTick.subscribe(n =>
  console.log(`Sequence: ${n}`)
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
