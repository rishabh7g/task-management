const BASE_DELAY = 2000; // Adjust this as needed

// Delay middleware
const delayMiddleware = (req, res, next) => {
  // Calculate custom delay based on request path or other parameters
  let customDelay = 0;

  // Calculate total delay
  const totalDelay = BASE_DELAY + customDelay;

  // Introduce delay
  setTimeout(() => next(), totalDelay);
};

module.exports = delayMiddleware;
