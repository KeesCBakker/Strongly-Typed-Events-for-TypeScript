import { DispatcherWrapper } from "ste-core";
import { ISignal } from "./ISignal";
import { ISignalHandler } from "./ISignalHandler";
import { SignalDispatcher } from "./SignalDispatcher";

export class SignalDispatcherWrapper
    extends DispatcherWrapper<ISignalHandler>
    implements ISignal {
    private _onSubscriptionChange: () => ISignal;

    constructor(dispatcher: SignalDispatcher) {
        super(dispatcher);

        this._onSubscriptionChange = () => dispatcher.onSubscriptionChange;
    }

    public get onSubscriptionChange() {
        return this._onSubscriptionChange();
    }
}
