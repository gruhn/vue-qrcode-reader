export declare class DropImageFetchError extends Error {
    constructor();
}
export declare class StreamApiNotSupportedError extends Error {
    constructor();
}
export declare class InsecureContextError extends Error {
    constructor();
}
export declare class StreamLoadTimeoutError extends Error {
    constructor();
}
export type EmittedError = DropImageFetchError | StreamApiNotSupportedError | InsecureContextError | StreamLoadTimeoutError | Error;
