import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';


const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

 
    if (token && token.startsWith("Bearer ")) {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

      // Attach the user to the request (excluding password)
      //ye line boht imp hai req.user almost har jagh use hoga
      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } else {
      return res.status(401).json({ message: "Not authorized, token missing or invalid format" });
    }
  } catch (error) {
    console.error("JWT auth error:", error.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;
