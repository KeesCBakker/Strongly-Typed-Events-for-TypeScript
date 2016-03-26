class PulseGenerator {

    //create private event dispatcher
    private _onPulsate: EventDispatcher<PulseGenerator, number> = new EventDispatcher<PulseGenerator, number>();
    frequencyInHz: number;

    //expose the event dispatcher through the IEvent interface
    //this will hide the dispatch method outside the class
    get onPulsate(): IEvent<PulseGenerator, number> {
        return this._onPulsate;
    }

    constructor(frequencyInHz: number) {
        this.frequencyInHz = frequencyInHz;

        this.start();
    }

    private start(): void {

        setTimeout(() => {

            this.start();

            //dispatch event by calling the dispatcher 
            this._onPulsate.dispatch(this, this.frequencyInHz);

        }, 1000 / this.frequencyInHz);
    }
}

interface IEvent<TSender, TArgs> {

    subscribe(fn: (sender: TSender, args: TArgs) => void): void;

    unsubscribe(fn: (sender: TSender, args: TArgs) => void): void;
}

class EventDispatcher<TSender, TArgs> implements IEvent<TSender, TArgs> {

    private _subscriptions: Array<(sender: TSender, args: TArgs) => void> = new Array<(sender: TSender, args: TArgs) => void>();

    subscribe(fn: (sender: TSender, args: TArgs) => void): void {
        if (fn) {
            this._subscriptions.push(fn);
        }
    }

    unsubscribe(fn: (sender: TSender, args: TArgs) => void): void {
        let i = this._subscriptions.indexOf(fn);
        if (i > -1) {
            this._subscriptions.splice(i, 1);
        }
    }

    dispatch(sender: TSender, args: TArgs): void {
        for (let handler of this._subscriptions) {
            handler(sender, args);
        }
    }
}

window.onload = function() {

  var generator = new PulseGenerator(1);

  //subscribe on the onPulse event
  generator.onPulsate.subscribe((p, hz) => {

      //play beep:
      var snd = new Audio("data:audio/wav;base64,UklGRkYDAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YSIDAAAAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAAAzNRVWFVYzNQAAzcrrqeupzcoAADM1FVYVVjM1AADNyuup66nNygAAMzUVVhVWMzUAAM3K66nrqc3KAACJNO5T2lKKMgAAys50sYeyydAAAOMtK0kYSOQrAABx1Ta8Sr1v1wAAPCdoPlU9PiUAABfc+cYMyBbeAACWIKYzkjKXHgAAveK70c/SvOQAAO8Z4yjQJ/EXAABk6X7ckd1j6wAASRMhHg0dShEAAArwQedU6AnyAACjDF4TSxKkCgAAsfYD8hfzr/gAAPwFnAiIB/0DAABX/cb82f1W/wAA");
      snd.play();

  });

  //change frequency
  window.setTimeout(function () {
      generator.frequencyInHz = 2;
  }, 3000);

  //change frequency
  window.setTimeout(function () {
      generator.frequencyInHz = 0.5;
  }, 6000);
}
