'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const cors_1 = __importDefault(require('cors'));
const express_1 = __importDefault(require('express'));
const cors_options_config_1 = __importDefault(
    require('./config/cors-options.config'),
);
const credentials_middleware_1 = __importDefault(
    require('./middleware/credentials.middleware'),
);
const headers_middleware_1 = __importDefault(
    require('./middleware/headers.middleware'),
);
const network_error_middleware_1 = __importDefault(
    require('./middleware/network-error.middleware'),
);
const verify_jwt_middleware_1 = __importDefault(
    require('./middleware/verify-jwt.middleware'),
);
const login_routes_1 = __importDefault(require('./routes/login.routes'));
const logout_routes_1 = __importDefault(require('./routes/logout.routes'));
const refresh_token_routes_1 = __importDefault(
    require('./routes/refresh-token.routes'),
);
const register_routes_1 = __importDefault(require('./routes/register.routes'));
const tasks_routes_1 = __importDefault(require('./routes/tasks.routes'));
const swagger_1 = __importDefault(require('../swagger'));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(credentials_middleware_1.default);
(0, swagger_1.default)(app);
app.use((0, cors_1.default)(cors_options_config_1.default));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, headers_middleware_1.default)(process.env.FRONTEND_URL));
app.use('/api-docs', swagger_1.default);
app.use(register_routes_1.default);
app.use(login_routes_1.default);
app.use(logout_routes_1.default);
app.use(refresh_token_routes_1.default);
app.use(verify_jwt_middleware_1.default);
app.use(tasks_routes_1.default);
app.all('*', (req, res) => {
    res.status(404).json({ error: '404 Not Found' });
});
app.use(network_error_middleware_1.default);
const PORT = process.env.PORT || 8090;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
