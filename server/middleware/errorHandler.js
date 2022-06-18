exports.errorHandler = (error, req, res, next) => {
  if (error.statusCode) {
    res.status(error.statusCode);
  } else {
    res.status(500);
  }
  console.error(error);
  return res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🧁" : error.stack,
  });
};
