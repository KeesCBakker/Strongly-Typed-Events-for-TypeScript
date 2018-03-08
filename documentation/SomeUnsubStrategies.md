# Some unsubscribe strategies
There multiple ways to unsubscribe from an event. This page shows all the 
options using the following example:
```typescript
import { SignalDispatcher, SimpleEventDispatcher, EventDispatcher } from "strongly-typed-events";

class Clock {
  private _onClockTick = new EventDispatcher<Clock, number>();
  private _ticks: number = 0;

  constructor(public name: string, timeout: number) {
    setInterval(() => {
      this._ticks += 1;
      this._onClockTick.dispatch(this, this._ticks);
    }, timeout);
  }

  public get onClockTick() {
    return this._onClockTick.asEvent();
  }
}

let clock = new Clock(1000);
```

## Unsubscribe using the handler

```typescript

let handler = (c: Clock, n: number) { };



```