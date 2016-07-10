/// <reference path="../stronglytypedevents.ts" />
/// <reference path="../typings/stronglytypedevents.d.ts" />

class TrafficLight {
    private _signals = new SignalList();
    private _color = 'red';

    public constructor(
        public greenMs: number,
        public orangeMs: number,
        public redMs: number
    ) {
        this.onSwitchToGreen.subscribe(() => this._color = 'green');
        this.onSwitchToOrange.subscribe(() => this._color = 'orange');
        this.onSwitchToRed.subscribe(() => this._color = 'red');

        this.internalStart();
    }

    public get color(): string {
        return this._color;
    }

    public get onSwitchToGreen(): ISignal {
        return this._signals.get('green').asEvent();
    }

    public get onSwitchToRed(): ISignal {
        return this._signals.get('red').asEvent();
    }

    public get onSwitchToOrange(): ISignal {
        return this._signals.get('orange').asEvent();
    }

    private internalStart(): void {
        window.setTimeout(() => {
            this._signals.get('green').dispatch();
            window.setTimeout(() => {
                this._signals.get('orange').dispatch();
                window.setTimeout(() => {
                    this._signals.get('red').dispatch();
                    this.internalStart();
                }, this.orangeMs);
            }, this.greenMs)
        }, this.redMs)
    }
}

var light = new TrafficLight(5000, 1500, 10000);
light.onSwitchToGreen.subscribe(() => console.log('Light is green.'));
light.onSwitchToOrange.subscribe(() => console.log('Light is orange.'));
light.onSwitchToRed.subscribe(() => console.log('Light is red.'));