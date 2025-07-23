# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Build**: `pnpm run build` - Compiles the library using Vite
**Type Check**: `pnpm run type-check` - Runs Vue TypeScript compiler without emitting files
**Format**: `pnpm run format` - Formats code using Prettier (Vue, TS, JSON, MD files)
**Documentation**: 
- `pnpm run docs:dev` - Starts VitePress dev server for documentation
- `pnpm run docs:build` - Builds documentation
- `pnpm run docs:preview` - Previews built documentation

**Package Manager**: Uses pnpm (v8.3.1) - always use `pnpm` instead of `npm`

## Architecture Overview

This is a Vue 3 QR code/barcode scanning library with three main components:

### Core Components (`src/components/`)
- **QrcodeStream.vue**: Continuous camera stream scanning using WebRTC
- **QrcodeCapture.vue**: File upload scanning (click to select files)
- **QrcodeDropZone.vue**: Drag-and-drop file scanning

### Utility Modules (`src/misc/`)
- **scanner.ts**: Core barcode detection logic using `barcode-detector` library
- **camera.ts**: Camera management, device selection, and constraints
- **errors.ts**: Centralized error handling and error types
- **shimGetUserMedia.ts**: WebRTC compatibility layer
- **util.ts**: General utility functions
- **callforth.ts**: Promise/callback management utilities

### Key Dependencies
- **barcode-detector**: Core barcode/QR detection (WebAssembly-based)
- **webrtc-adapter**: Browser compatibility for WebRTC APIs
- Built for Vue 3 with TypeScript support

### Component Architecture
- Uses Vue 3 Composition API with `<script setup>`
- Components emit `detect` events with `DetectedBarcode[]` payload
- Error handling via `error` events with `EmittedError` payload
- Camera management via `camera-on`/`camera-off` events
- Torch (flashlight) support where available
- Responsive design with minimal default styling

### Build Configuration
- **Target**: ES2020+ (supports older browsers via transpilation)
- **Output**: ES module + UMD bundle
- **External**: Vue.js (not bundled)
- Uses Vite with TypeScript declaration generation
- Library built to `dist/` directory

### Documentation
- Uses VitePress for documentation in `docs/` directory
- API documentation for each component
- Live demos with code examples
- Hosted at https://gruhn.github.io/vue-qrcode-reader/

## Development Notes

- The project uses ESLint with Vue 3, TypeScript, and Prettier configurations
- WebAssembly files are fetched from CDN at runtime for barcode detection
- Supports multiple barcode formats beyond QR codes (configurable via `formats` prop)
- Camera access requires HTTPS in production environments
- Components handle browser compatibility issues internally