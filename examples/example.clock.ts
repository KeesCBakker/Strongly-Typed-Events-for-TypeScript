import {
  SimpleEventDispatcher,
  SignalDispatcher,
  EventDispatcher,
  IEvent
} from "strongly-typed-events";

declare var window: any;
declare var alert: any;
declare var console: any;
declare var Image: any;

/*
 * This clock example shows how to use Strongly Typed Events
 * with interfaces.
 */

interface IClock {
  OnTick(): IEvent<IClock, number>;
}

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

let clock = new Clock("Smu", 1000);

//log the ticks to the console
clock.onTick.subscribe(() => console.log("Tick!"));

//log the sequence parameter to the console
clock.onSequenceTick.subscribe(s => console.log(`Sequence: ${s}`));

//log the name of the clock and the tick argument to the console
clock.onClockTick.subscribe((c, n) =>
  console.log(`${c.name} ticked ${n} times.`)
);
