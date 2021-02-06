import { EventDispatcher, IEventHandler, IEvent  } from "../src";
import { expect } from "chai";

interface ICustomEvent<TSender, TEvent> extends IEvent<TSender, TEvent>
{
    readonly onSubscriptionChange: IEvent<CustomEventDispatcher<TSender, TEvent>, number>
}

export class CustomEventDispatcher<TSender, TEvent> extends EventDispatcher<
    TSender,
    TEvent
> {
    private _onSubscriptionChange = new EventDispatcher<
        CustomEventDispatcher<TSender, TEvent>,
        number
    >();

    public get onSubscriptionChange() {
        return this._onSubscriptionChange.asEvent();
    }

    public subscribe(fn: IEventHandler<TSender, TEvent>) {
        const result = super.subscribe(fn);
        this._onSubscriptionChange.dispatch(this, this.count);
        return result;
    }

    public one(fn: IEventHandler<TSender, TEvent>) {
        const result = super.one(fn);
        this._onSubscriptionChange.dispatch(this, this.count);
        return result;
    }

    public unsubscribe(fn: IEventHandler<TSender, TEvent>) {
        super.unsubscribe(fn);
        this._onSubscriptionChange.dispatch(this, this.count);
    }

    public asEvent(){
        let event = super.asEvent() as any
        event.onSubscriptionChange = this.onSubscriptionChange;
        return event as ICustomEvent<TSender, TEvent>;
    }
}

class MyObject {
    private _onMyEvent = new CustomEventDispatcher<MyObject, number>();

    constructor() {}

    public get onMyEvent() {
        return this._onMyEvent.asEvent();
    }
}

describe("Features", () => {

    describe("Testing", () => {

        it.only("Sub counts", () => {
            
let obj = new MyObject();

obj.onMyEvent.onSubscriptionChange.sub( (_, cnt) => {
    console.log(`Sub changed: ${cnt} subscribers.`)
});

const a = ()=>{};
const b = ()=>{}
obj.onMyEvent.sub(a);
obj.onMyEvent.sub(b);
obj.onMyEvent.unsub(a);

        });

    });
});
