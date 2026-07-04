// middleware/auth.js
module.exports = (req, res, next) => {
  if (req.headers.authorization === "secret") return next();
  res.status(401).json({ error: "Unauthorized" });
};
