import { jwtVerify } from 'jose';
import User from '../models/User.model.js';


const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

 
    if (token && token.startsWith("Bearer ")) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token.split(" ")[1], secret);

      // Attach the user to the request (excluding password)
      //ye line boht imp hai req.user almost har jagh use hoga
      req.user = await User.findById(payload.id).select("-password");

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
