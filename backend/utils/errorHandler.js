exports.handleError = (err, res, statusCode = 500) => {
  console.error(err);
  res.status(statusCode).json({ error: err.message });
};