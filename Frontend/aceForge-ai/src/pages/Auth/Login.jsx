import React from 'react';
import { validateEmail } from '../../utils/helper';
import { useState, useContext } from 'react';
import { API_PATHS } from '../../utils/apiPath';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Login = ({ switchPage }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      const msg = "Please enter a valid email address";
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }
  
    if (!password) {
      const msg = "Please enter a valid password";
      setError(msg);
      toast.error(msg);
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email.trim().toLowerCase(),
        password
      });

      if (response.data) {
        // Explicitly set token to localStorage first
        localStorage.setItem("token", response.data.token);
        
        // Then update user state
        updateUser(response.data);
        
        toast.success('Logged in successfully!');
        
        // Force redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black">Welcome Back</h2>
      <p className="mb-4 text-black">Please enter your details to log in</p>
      {error && (
        <div className="mb-4 p-2 text-red-500 bg-red-50 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <h1 className='text-black'>Email</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="w-full p-3 text-black border-2 rounded mb-4 outline-slate-700"
          disabled={isLoading}
        />
        <h1 className='text-black'>Password</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 Characters"
          className="w-full p-3 text-black border-2 rounded mb-4 outline-slate-700"
          disabled={isLoading}
        />
        <button 
          className={`w-full bg-black text-white py-2 rounded transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'LOGGING IN...' : 'LOGIN'}
        </button>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <span 
            onClick={switchPage} 
            className="text-amber-600 font-semibold cursor-pointer"
            style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
          >
            SignUp
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
