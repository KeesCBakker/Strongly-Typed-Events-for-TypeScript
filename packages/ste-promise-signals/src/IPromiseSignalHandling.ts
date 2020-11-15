import { IBaseEventHandling } from 'ste-core';
import { IPromiseSignalHandler } from './IPromiseSignalHandler';

/**
 * Indicates the object is capable of handling named signals.
 */

export interface IPromiseSignalHandling
    extends IBaseEventHandling<IPromiseSignalHandler> {
}
