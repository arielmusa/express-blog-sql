const handleError = (err, req, res, next) => {
  res.status(500);
  res.json({ error: err });
};

export { handleError };
