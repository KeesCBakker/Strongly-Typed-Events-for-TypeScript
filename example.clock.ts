/*
 * This clock example shows how to use Strongly Typed Events
 * with interfaces.
 */

interface IClock {

    OnTick(): IEvent<IClock, number>;
}

class Clock implements IClock {
    private _onTick: EventDispatcher<IClock, number> = new EventDispatcher<IClock, number>();
    private _ticks: number = 0;

    constructor(timeout: number) {
        var _this = this;
        window.setInterval(function () { _this.Tick(); }, timeout);
    }

    private Tick(): void {
        this._ticks += 1;
        this._onTick.dispatch(this, this._ticks);
    }

    OnTick(): IEvent<IClock, number> {
        return this._onTick;
    }
}
