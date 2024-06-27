// src/types/express.d.ts
import { User } from './types/data.types';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
