export declare function start(videoEl: HTMLVideoElement, { constraints, torch, restart }: {
    constraints: MediaTrackConstraints;
    torch: boolean;
    restart?: boolean;
}): Promise<Partial<MediaTrackCapabilities>>;
export declare function stop(): Promise<void>;
