# Strongly Typed Events for TypeScript
Add the power of events to your TypeScript classes (and interfaces).
<img height="300" src="http://keestalkstech.com/wp-content/uploads/2016/03/lightning-bolt-1203953_1280-590x332.png" />

## Events made easy!
This project will help you to add events, event handling en event dispatching to your classes. To get you started, check:

- <a href="documentation/HowToAddAnEventToAClass.md">How to add an event to a class?</a>
- <a href="documentation/HowToAddAnEventToAnInterface.md">How to add an event to an interface?</a>
- <a href="documentation/HowToAddMultipleEventsToAClass.md">How to add multiple events to a class?</a>
- <a href="documentation/HowToAddDynamicNamedEeventsToAClass.md">How to add dynamic named events to a class?</a>
- <a href="documentation/OnEventsDispatchersAndLists.md">On events, dispatchers and lists (a general explanation of the system)</a>

Code tells more than words, so let's give two examples:

#### `IEventArgs<TSender, TArgs>` 
These type of events are modelled after the .Net event handler system and uses a generic sender and a generic argument.

````
class PulseGenerator {

    private _onPulsate: EventDispatcher<PulseGenerator, number> = new EventDispatcher<PulseGenerator, number>();
    frequencyInHz: number;

    get onPulsate(): IEvent<PulseGenerator, number> {
        return this._onPulsate.asEvent();
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
````
The events can be subscribed to like this: 
````
let generator = new PulseGenerator(10);

//subscribe on the onPulse event
generator.onPulsate.subscribe((p, hz) => {
    alert('Peep!');
});
````

#### `ISimpleEvent<TArgs>`
Need something simpler? These type of events only use a generic argument.

````
class ImageDownloader {

    private _ondownload: SimpleEventDispatcher<ImageDownloadArg> = new SimpleEventDispatcher();

    public get ondownload(): ISimpleEvent<ImageDownloadArg> {
        return this._ondownload.asEvent();
    }

    public download(url: string, callback?: ISimpleEventHandler<ImageDownloadArg>) {

        let img = new Image();

        img.onload = () => {

            let result = new ImageDownloadArg(url, img.height, img.width);

            if (callback) {
                callback(result);
            }

            this._ondownload.dispatch(result);
        };

        img.src = url;
    }
}

````
You can use events by subscribing onto the event:
````
let downloader = new ImageDownloader();

downloader.ondownload.subscribe((arg: ImageDownloadArg) => {
    var x = `Url: "${arg.url}", height: ${arg.height}, width: ${arg.width}`;
    alert(x);
});

downloader.download('https://keestalkstech.com/wp-content/uploads/2016/05/hashing2-590x332.jpg');
````

Check the <a href="documentation">documentation</a> or the <a href="examples">examples</a> for more information.


#### Version 0.2
**Introduced simple events &ndash; events that only use an arguments object.** I've added many base classes and 
interfaces to make sure the base for both type of events are the same. The following objects and features are present in this version:

- `ISimpleEvent<TSender, TArgs>` &ndash; Event handler function with a generic argument
- `SimpleEventDispatcher<TSender, TArgs>` &ndash; Dispatcher implementation for simple events. Can be used to subscribe, 
unsubscribe or dispatch events. Use the ToEvent() method to expose the event
- `SimpleEventList<TSender, TArgs>` &ndash; Storage class for multiple events that are accessible by name. Events dispatchers are automatically created.
- `SimpleEventHandlingBase<TSender, TArgs>` &ndash; Extends objects with simple event handling capabilities.
- Added an `asEvent()` method to the dispatchers that will expose only the subsribe / unsubscribe methods. This will prevent
the `dispatch` method from being exposed through the events.


#### Version 0.1
Introducing the events - use a generic sender and a generic argument to dispatch events through your projects. The following 
objects and features are present in this version:

- `IEvent<TSender, TArgs>` &ndash; Event handler function with a generic sender and a generic argument.
- `EventDispatcher<TSender, TArgs>` &ndash; Dispatcher implementation for events. Can be used to subscribe, 
unsubscribe or dispatch events. Use the ToEvent() method to expose the event.
- `EventList<TSender, TArgs>` &ndash; Storage class for multiple events that are accessible by name. Events dispatchers are automatically created.
- `EventHandlingBase<TSender, TArgs>` &ndash; Extends objects with event handling capabilities.
