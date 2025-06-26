import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

const SignUp = ({ switchPage }) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profileImageUrl, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Cleanup function for URL.createObjectURL
  useEffect(() => {
    return () => {
      if (profileImageUrl && profileImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  const validateFile = (file) => {
    if (!file) return 'Please select a file';
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'File type not supported. Please upload a JPEG, PNG, or GIF image.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size too large. Maximum size is 5MB.';
    }
    return null;
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileError = validateFile(file);
    if (fileError) {
      setErrorMessage(fileError);
      return;
    }

    // Cleanup previous objectURL if exists
    if (profileImageUrl && profileImageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(profileImageUrl);
    }

    setProfileImage(URL.createObjectURL(file));
    setIsLoading(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'FirstCloud');
      formData.append('cloud_name', 'dg4upid0d');

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/dg4upid0d/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!cloudinaryRes.ok) {
        const cloudinaryError = await cloudinaryRes.json();
        throw new Error(cloudinaryError.error?.message || cloudinaryRes.statusText);
      }

      const cloudinaryData = await cloudinaryRes.json();
      setImgUrl(cloudinaryData.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Failed to upload image. Please try again.');
      setProfileImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Validation
      if (!fullName.trim()) {
        throw new Error("Please enter your full name");
      }

      if (!validateEmail(email)) {
        throw new Error("Please enter a valid email address");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // Signup data object
      const formData = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        profileImageUrl: imgUrl || null
      };

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData);
      
      if (response.data) {
        // Explicitly set token to localStorage first
        localStorage.setItem("token", response.data.token);
        
        // Then update user state
        updateUser(response.data);
        
        toast.success('Account created successfully!');
        
        // Force redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 500);
      }

    } catch (error) {
      console.error('Signup error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'An error occurred during signup';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <div>
      <h2 className="text-xl font-bold text-black">Create an Account</h2>
      <p className="text-sm text-gray-500 mb-6">Join us today by entering your details below.</p>

      {errorMessage && (
        <div className="mb-4 p-2 text-red-500 bg-red-50 rounded">
          {errorMessage}
        </div>
      )}

      {/* Profile Image Upload */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <img
          src={profileImageUrl || '/user.jpg'}
          alt="Profile"
          className={`rounded-full w-full h-full object-cover bg-gray-100 ${isLoading ? 'opacity-50' : ''}`}
        />
        <label className={`absolute bottom-0 right-0 bg-orange-400 rounded-full p-1 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Upload size={16} className="text-white" />
          <input 
            type="file" 
            onChange={handleProfileUpload} 
            className="hidden" 
            accept={ALLOWED_FILE_TYPES.join(',')}
            disabled={isLoading}
          />
        </label>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-400"></div>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm text-black font-medium">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-1 px-4 text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={isLoading}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={isLoading}
            required
          />
        </div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Min 8 Characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 text-black py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={isLoading}
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 bottom-3 text-gray-500"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full bg-black text-white py-2 rounded-md transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
        </button>
      </form>

      {/* Footer link */}
      <p className="text-center text-black text-sm mt-4">
        Already have an account?{' '}
        <button 
          onClick={switchPage} 
          className="text-orange-500 hover:underline"
          disabled={isLoading}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignUp;
