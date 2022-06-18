exports.errorHandler = (error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  console.error(error);
  return res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🧁" : error.stack,
  });
};
