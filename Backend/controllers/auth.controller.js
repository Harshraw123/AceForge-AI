import User from '../models/User.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//Generate Jwt Token




   export  const generateToken=(userId)=>{
    return jwt.sign({id:userId},
        process.env.JWT_SECRET,
        {
            expiresIn:'7d'
        }
    )
};

 
export const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
  
    try {
      // Check if user already exists
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        profileImageUrl,
      });
  
      // Respond with token and user info
      res.status(200).json({
        success: true,
        message: "User registered successfully",
        token: generateToken(user._id),
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,

      });
  
    } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };




  
  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email }); // ✅ await added
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'User email not found in database',
        });
      }
  
      // ✅ Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Invalid password',
        });
      }
  
      // ✅ Send response with JWT token
      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token: generateToken(user._id),
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      });
  
    } catch (error) {
      res.status(500).json({ // ✅ status corrected to 500
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  };
  

 export const getUserProfile=async(req,res)=>{

  try{
    const user=await User.findById(req.user._id).select("-password");
    if(!user){
      return  res.status(404).json({message:"User not found"})

    }
    res.json(user)
  } catch(error){
    res.status(500).json({message:"server error",error:error.message});

  }


}

