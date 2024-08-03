import mongoose from 'mongoose';
import { app } from 'src/app';
import { EnvVariableName } from 'src/constant/dotenv.constant';
import { readEnvVariable } from 'src/util/dotenv';

const PORT = readEnvVariable(EnvVariableName.PORT) || 8090;
const MONGODB_USERNAME = readEnvVariable(EnvVariableName.MONGODB_USERNAME);
const MONGODB_PASSWORD = readEnvVariable(EnvVariableName.MONGODB_PASSWORD);
const MONGODB_COLLECTION_NAME = readEnvVariable(
    EnvVariableName.MONGODB_COLLECTION_NAME,
);
const MONGODB_URI = readEnvVariable(EnvVariableName.MONGODB_URI)
    .replace('<USERNAME>', MONGODB_USERNAME)
    .replace('<PASSWORD>', MONGODB_PASSWORD)
    .replace('<COLLECTION>', MONGODB_COLLECTION_NAME);

mongoose
    .connect(MONGODB_URI, {
        autoIndex: true,
    })
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Connected to MongoDB');
    });

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
