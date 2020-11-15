export interface ISubscription<TEventHandler> {
    
    readonly isExecuted: boolean;

    readonly isOnce: boolean;

    readonly handler: TEventHandler;
}
