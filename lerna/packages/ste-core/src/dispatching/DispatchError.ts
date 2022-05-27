
/**
 * Indicates an error with dispatching.
 * 
 * @export
 * @class DispatchError
 * @extends {Error}
 */
export class DispatchError extends Error 
{
    /**
     * Creates an instance of DispatchError.
     * @param {string} message The message.
     * 
     * @memberOf DispatchError
     */
    constructor(message: string){
        super(message);
    }
}