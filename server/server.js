require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const swaggerSetup = require('./swagger');
const headerMiddleware = require('./middleware/headers.middleware');
const registerRoutes = require('./routes/register.routes');
const loginRoutes = require('./routes/login.routes');
const logoutRoutes = require('./routes/logout.routes');
const refreshTokenRoutes = require('./routes/refresh-token.routes');
const taskRoutes = require('./routes/tasks.routes');
const networkErrorMiddleware = require('./middleware/network-error.middleware');
const credentials = require('./middleware/credentials.middleware');
const corsOptions = require('./config/cors-options.config');
const verifyJWT = require('./middleware/verify-jwt.middleware');

const PORT = process.env.PORT || 8090;

app.use(credentials);
swaggerSetup(app);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(headerMiddleware(process.env.FRONTEND_URL));

// auth routes
app.use(registerRoutes);
app.use(loginRoutes);
app.use(logoutRoutes);
app.use(refreshTokenRoutes);

// verify JWT for the following routes
app.use(verifyJWT);

// task routes
app.use(taskRoutes);
// create route for getting all the tasks

// 404 error handler
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(networkErrorMiddleware);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`);
});
