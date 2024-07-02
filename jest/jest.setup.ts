import { TextDecoder, TextEncoder } from 'util';

import 'whatwg-fetch';
// Polyfill TextEncoder and TextDecoder for Node.js (if needed)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder; // Explicit cast
