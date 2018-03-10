import { EventList, IEvent } from "strongly-typed-events";

class Stopwatch {
  private _events = new EventList<Stopwatch, StopwatchEventArgs>();
  private _ticks = 0;
  private _timer: number;

  get onStart(): IEvent<Stopwatch, StopwatchEventArgs> {
    return this._events.get("onStart").asEvent();
  }

  get onPause(): IEvent<Stopwatch, StopwatchEventArgs> {
    return this._events.get("onPause").asEvent();
  }

  get onReset(): IEvent<Stopwatch, StopwatchEventArgs> {
    return this._events.get("onReset").asEvent();
  }

  private dispatch(name: string) {
    this._events
      .get(name)
      .dispatch(this, new StopwatchEventArgs(this._ticks, this.display()));
  }

  start() {
    if (this._timer == null) {
      this._timer = Date.now();
      this.dispatch("onStart");
    }
  }

  pause() {
    if (this._timer) {
      this._ticks = this.getTicks();
      this._timer = null;
      this.dispatch("onPause");
    }
  }

  reset() {
    this._ticks = 0;
    this._timer = Date.now();
    this.dispatch("onReset");
  }

  getTicks() {
    if (this._timer) {
      return Date.now() - this._timer + this._ticks;
    }

    return this._ticks;
  }

  display() {
    var ticks = this.getTicks();

    //get seconds from ticks
    var ts = ticks / 1000;

    //conversion based on seconds
    let hh: any = Math.floor(ts / 3600);
    let mm: any = Math.floor((ts % 3600) / 60);
    let ss: any = (ts % 3600) % 60;

    //prepend '0' when needed
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    //use it
    var str = hh + ":" + mm + ":" + ss;

    return str;
  }
}

class StopwatchEventArgs {
  private _ticks: number;
  private _display: string;

  get ticks() {
    return this._ticks;
  }

  get display() {
    return this._display;
  }

  constructor(ticks: number, display: string) {
    this._ticks = ticks;
    this._display = display;
  }
}

declare var window: any;
declare var alert: any;

window.onload = function() {
  var sw = new Stopwatch();

  sw.onStart.subscribe((sender, args) => {
    alert("Stopwatch started after " + args.display + ".");
  });

  sw.onPause.subscribe((sender, args) => {
    alert("Paused after " + args.display + ".");
  });

  sw.start();

  window.setTimeout(function() {
    sw.pause();
  }, 3000);

  window.setTimeout(function() {
    sw.start();
  }, 4000);
};
