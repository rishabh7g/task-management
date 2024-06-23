const networkErrorMiddleware = (err, req, res) => {
    const status = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred.';
    res.status(status).json({ error: message });
};

module.exports = networkErrorMiddleware;
