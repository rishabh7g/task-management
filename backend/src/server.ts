import { app } from 'src/app';
import { EnvVariableName } from 'src/constant/dotenv.constant';
import { connectToMongoDB } from 'src/mongoose';
import { readEnvVariable } from 'src/util/dotenv';

const PORT = readEnvVariable(EnvVariableName.PORT) || 8090;
connectToMongoDB().then(() => {
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
