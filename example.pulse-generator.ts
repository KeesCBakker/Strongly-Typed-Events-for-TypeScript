class PulseGenerator {

    //create private event dispatcher
    private _onPulsate: EventDispatcher<PulseGenerator, number> = new EventDispatcher<PulseGenerator, number>();
    hertz: number;

    //expose the event dispatcher through the IEvent interface
    //this will hide the dispatch method outside the class
    get onPulse(): IEvent<PulseGenerator, number> {
        return this._onPulsate;
    }

    constructor(hertz: number) {
        this.hertz = hertz;

        this.start();
    }

    private start() {
        var _this = this;
        window.setTimeout(function () {

            _this.start();

            //dispatch event by calling the dispatcher 
            _this._onPulsate.dispatch(_this, _this.hertz);

        }, 1000 / this.hertz);
    }
}
