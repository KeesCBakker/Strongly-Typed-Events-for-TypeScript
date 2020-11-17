import { ISubscribable } from 'ste-core';
import { IPromiseSignalHandler } from './IPromiseSignalHandler';

/**
 * Models a signal. This type of events has no arguments.
 * @interface ISignalHandler
 * @extends {ISubscribable<ISignalHandler>}
 */

export interface IPromiseSignal extends ISubscribable<IPromiseSignalHandler> { }
