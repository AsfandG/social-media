const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(403).json({ msg: "Access Denied!" });
    }
    const token = authHeaders.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { verifyToken };
