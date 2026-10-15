// Request Logger Middleware
// Logs method, path, status code, and response time for every incoming request

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const timestamp = new Date().toISOString();

    const color =
      status >= 500
        ? "\x1b[31m" // red
        : status >= 400
        ? "\x1b[33m" // yellow
        : status >= 200
        ? "\x1b[32m" // green
        : "\x1b[36m"; // cyan

    const reset = "\x1b[0m";

    console.log(
      `${timestamp} ${color}[${method}]${reset} ${originalUrl} → ${color}${status}${reset} (${duration}ms)`
    );
  });

  next();
};

export default requestLogger;
