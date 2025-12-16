import { type DetectedBarcode, type BarcodeFormat } from 'barcode-detector/pure';
/**
 * Update the set of targeted barcode formats. In particular, this function
 * can be called during scanning and the camera stream doesn't have to be
 * interrupted.
 */
export declare function setScanningFormats(formats: BarcodeFormat[]): void;
type ScanHandler = (_: DetectedBarcode[]) => void;
/**
 * Continuously extracts frames from camera stream and tries to read
 * potentially pictured QR codes.
 */
export declare const keepScanning: (videoElement: HTMLVideoElement, { detectHandler, locateHandler, minDelay, formats }: {
    detectHandler: ScanHandler;
    locateHandler: ScanHandler;
    minDelay: number;
    formats: BarcodeFormat[];
}) => Promise<void>;
export declare const processFile: (file: File, formats?: BarcodeFormat[]) => Promise<DetectedBarcode[]>;
export declare const processUrl: (url: string, formats?: BarcodeFormat[]) => Promise<DetectedBarcode[]>;
export {};
