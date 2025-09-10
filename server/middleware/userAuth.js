import jwt from "jsonwebtoken"

const userAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;  // 👈 header se nahi, cookie se lo

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // 👈 ab yeh getUserData me chalega
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default userAuth;
