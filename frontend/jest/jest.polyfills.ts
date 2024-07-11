import { TextDecoder, TextEncoder } from 'node:util';
import 'whatwg-fetch';

Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
});
