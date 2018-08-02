# Some unsubscribe strategies
There are multiple ways to unsubscribe from an event. This page shows all the 
options using the following example:
```typescript
import { EventDispatcher } from "strongly-typed-events";

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
You can unsubscribe using the event and calling `unsub` or `unsubscribe`.
```typescript
let fn = (c: Clock, n: number) { };
clock.onClockTick.sub(fn);
clock.onClockTick.unsub(fn);
```

## Unsubscribe through the subscribe (since v1.1)
The `sub` or `subscribe` of the event will return an unsubscribe function.
```typescript
let fn = (c: Clock, n:number) { };
let unsub = clock.onClockTick.sub(fn);
unsub();
```

## Auto unsubscribe if one
The `one` method of the event will only fire once and unsubscribe itself after firing.
```typescript
let fn = (c: Clock, n:number) { };
clock.onClockTick.one(fn);
```

## Unsub through event management (since v1.2)
Each event gets an event management object as last parameter. You can use this object
to unsubscribe the handler that caused the event.
```typescript
clock.onClockTick.sub((c: Clock, n:number, ev:IEventManagement) => {
    ev.unsub();
});
```
