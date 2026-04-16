const jwt = require("jsonwebtoken");

module.exports = function (allowedRoles) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "No token" });
      }

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // check role
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};