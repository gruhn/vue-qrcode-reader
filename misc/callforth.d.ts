export declare const eventOn: (eventTarget: EventTarget, successEvent: string, errorEvent?: string) => Promise<Event>;
export declare const timeout: (milliseconds: number) => Promise<unknown>;
export declare const polling: (predicate: any, options: {
    maxTries: number;
    interval: number;
}) => Promise<any>;
