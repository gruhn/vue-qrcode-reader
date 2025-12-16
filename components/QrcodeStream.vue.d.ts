import type { DetectedBarcode, BarcodeFormat } from 'barcode-detector/pure';
export interface QrcodeStreamProps {
    /**
     * Passes an object with various camera configuration options.
     */
    constraints?: MediaTrackConstraints;
    /**
     * Passes formats that will be recognized during detection.
     */
    formats?: BarcodeFormat[];
    /**
     * Setting this prop to true freezes the camera. Set to false to resume.
     */
    paused?: boolean;
    /**
     * Enables or disables camera torch during detection.
     */
    torch?: boolean;
    /**
     * A function responsible for visually highlighting detected QR codes in real-time.
     * A transparent canvas overlays the camera stream. When a barcode is detected, its location is painted to the canvas.
     * To enable this feature, pass a function to the `track` that defines how this should look like.
     * The function is called to produce each frame. It receives an array of detected codes as the first argument and a
     * `CanvasRenderingContext2D` instance as the second argument.
     *
     * NOTE: The scanning frequency is increased when you provide a track function, which might hurt performance perceptibly.
     *
     * WARN: Avoid access to reactive properties in this function (like stuff in data, computed or your Vuex store).
     * The function is called several times a second and might cause memory leaks. To be safe don't access `this` at all.
     */
    track?: (detectedCodes: DetectedBarcode[], ctx: CanvasRenderingContext2D) => void;
}
declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<QrcodeStreamProps>, {
    constraints: () => MediaTrackConstraints;
    formats: () => string[];
    paused: boolean;
    torch: boolean;
    track: any;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    detect: (detectedCodes: DetectedBarcode[]) => void;
    "camera-on": (capabilities: Partial<MediaTrackCapabilities>) => void;
    "camera-off": () => void;
    error: (error: EmittedError) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<QrcodeStreamProps>, {
    constraints: () => MediaTrackConstraints;
    formats: () => string[];
    paused: boolean;
    torch: boolean;
    track: any;
}>>> & {
    onError?: (error: EmittedError) => any;
    onDetect?: (detectedCodes: DetectedBarcode[]) => any;
    "onCamera-on"?: (capabilities: Partial<MediaTrackCapabilities>) => any;
    "onCamera-off"?: () => any;
}, {
    formats: BarcodeFormat[];
    track: (detectedCodes: DetectedBarcode[], ctx: CanvasRenderingContext2D) => void;
    torch: boolean;
    constraints: MediaTrackConstraints;
    paused: boolean;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
