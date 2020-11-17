
/**
 * Indicates an error with dispatching.
 * 
 * @export
 * @class DispatchError
 * @extends {Error}
 */
export class DispatchError extends Error 
{
    constructor(message: string){
        super(message);
    }
}