require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const swaggerSetup = require('./swagger');
const delayMiddleware = require('./middleware/delay.middleware');
const headerMiddleware = require('./middleware/headers.middleware');
const corsMiddleware = require('./middleware/cors.middleware');
const taskRoutes = require('./routes/tasks.routes');
const networkErrorMiddleware = require('./middleware/network-error.middleware');
const { allowedOrigins } = require('./allowed-origins');

const app = express();

app.use(corsMiddleware(allowedOrigins));
app.use(bodyParser.json());
app.use(headerMiddleware(allowedOrigins));
app.use(delayMiddleware);
app.use(taskRoutes);

swaggerSetup(app);

app.use(networkErrorMiddleware);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`);
});
