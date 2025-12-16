import { type BarcodeFormat, type DetectedBarcode } from 'barcode-detector/pure';
export interface QrcodeDropZoneProps {
    formats?: BarcodeFormat[];
}
declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<QrcodeDropZoneProps>, {
    formats: () => string[];
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    detect: (detectedCodes: DetectedBarcode[]) => void;
    dragover: (isDraggingOver: boolean) => void;
    error: (error: EmittedError) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<QrcodeDropZoneProps>, {
    formats: () => string[];
}>>> & {
    onError?: (error: EmittedError) => any;
    onDetect?: (detectedCodes: DetectedBarcode[]) => any;
    onDragover?: (isDraggingOver: boolean) => any;
}, {
    formats: BarcodeFormat[];
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
