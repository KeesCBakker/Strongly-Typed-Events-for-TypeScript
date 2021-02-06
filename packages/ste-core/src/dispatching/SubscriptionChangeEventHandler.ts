import { DispatcherBase } from "..";

export type SubscriptionChangeEventHandler = (count: number) => void;

export class SubscriptionChangeEventDispatcher extends DispatcherBase<SubscriptionChangeEventHandler>
{
    public dispatch(count: number){
        this._dispatch(false, this, arguments);
    }
}