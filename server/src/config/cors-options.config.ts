import { allowedOrigins } from 'src/config/allowed-origins.config';

const corsOptions = {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void,
    ) => {
        const isOriginAllowed = origin && allowedOrigins.indexOf(origin) !== -1;
        const isSelfServer = !origin;
        if (isOriginAllowed || isSelfServer) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    optionsSuccessStatus: 200,
};

export default corsOptions;
