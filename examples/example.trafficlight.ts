import { SignalList, ISignal } from "strongly-typed-events";

declare var console: any;
declare var setTimeout: any;

class TrafficLight {
  private _signals = new SignalList();
  private _color = "red";

  public constructor(
    public greenMs: number,
    public orangeMs: number,
    public redMs: number
  ) {
    this.onSwitchToGreen.subscribe(() => (this._color = "green"));
    this.onSwitchToOrange.subscribe(() => (this._color = "orange"));
    this.onSwitchToRed.subscribe(() => (this._color = "red"));

    this.internalStart();
  }

  public get color() {
    return this._color;
  }

  public get onSwitchToGreen(): ISignal {
    return this._signals.get("green").asEvent();
  }

  public get onSwitchToRed(): ISignal {
    return this._signals.get("red").asEvent();
  }

  public get onSwitchToOrange(): ISignal {
    return this._signals.get("orange").asEvent();
  }

  private internalStart() {
    setTimeout(() => {
      this._signals.get("green").dispatch();
      setTimeout(() => {
        this._signals.get("orange").dispatch();
        setTimeout(() => {
          this._signals.get("red").dispatch();
          this.internalStart();
        }, this.orangeMs);
      }, this.greenMs);
    }, this.redMs);
  }
}

var light = new TrafficLight(5000, 1500, 10000);
light.onSwitchToGreen.subscribe(() => console.log("Light is green."));
light.onSwitchToOrange.subscribe(() => console.log("Light is orange."));
light.onSwitchToRed.subscribe(() => console.log("Light is red."));
