import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

import 'whatwg-fetch';
// Polyfill TextEncoder and TextDecoder for Node.js (if needed)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder; // Explicit cast
