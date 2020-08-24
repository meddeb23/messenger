const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) throw err;
      req.body = {
        ...req.body,
        user_id: decode,
      };
      console.log(`Middleware : decode = ${decode}`);
      next();
    });
  } else {
    res.status(403).json({ success: false, message: "Access Denied" });
    next();
  }
};

module.exports = { auth };
