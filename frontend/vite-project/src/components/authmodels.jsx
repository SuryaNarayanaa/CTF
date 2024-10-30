import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {  signup ,login } from "@/api/auth";
import {createTeam} from "@/api/createteam";

const SuccessMessage = ({ message }) => (
  <div className="fixed top-4 right-4 z-50 animate-fade-in">
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 min-w-[200px]">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 bg-green-500"></div>
        <p className="text-sm font-['Press_Start_2P'] text-black">{message}</p>
      </div>
    </div>
  </div>
);

const AuthModal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-none border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-96 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-white-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl mb-6 font-['Press_Start_2P'] text-center text-black">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const LoginForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData);
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError('Wrong email or password!');
    }
  };

  return (
    <>
      {showSuccess && (
        <SuccessMessage message="Login successful! Welcome back!" />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-white border-2 border-black p-2 text-red-500 text-xs text-center font-['Press_Start_2P']">{error}</div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="font-['Press_Start_2P'] text-xs">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-2 border-black focus:ring-2 focus:ring-green-400 font-['Press_Start_2P'] text-xs"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="font-['Press_Start_2P'] text-xs">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border-2 border-black focus:ring-2 focus:ring-green-400 font-['Press_Start_2P'] text-xs"
          />
        </div>
        <button
          type="submit"
          className="w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 bg-white border-2 border-black text-black rounded-none font-['Press_Start_2P'] text-sm transform hover:-translate-y-1 transition duration-200 hover:bg-green-400/10"
        >
          Login
        </button>
      </form>
    </>
  );
};

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default role
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const signupData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      console.log('Sending signup data:', signupData); // Log the data being sent
      await signup(signupData);
      
      const teamData = {        
        name: formData.email.split('@')[0],
        leader: formData.username
      };
      await createTeam(teamData);

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Registration error:', err); // Log the error for debugging
      setError('Registration failed! Try again.');
    }
  };

  return (
    <>
      {showSuccess && (
        <SuccessMessage message="Registration successful! Welcome aboard!" />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-white border-2 border-black p-2 text-red-500 text-xs text-center font-['Press_Start_2P']">{error}</div>
        )}
        <div className="space-y-2">
          <Label htmlFor="username" className="font-['Press_Start_2P'] text-xs">Username</Label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border-2 border-black focus:ring-2 focus:ring-green-400 font-['Press_Start_2P'] text-xs"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-email" className="font-['Press_Start_2P'] text-xs">Email</Label>
          <Input
            id="register-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-2 border-black focus:ring-2 focus:ring-green-400 font-['Press_Start_2P'] text-xs"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password" className="font-['Press_Start_2P'] text-xs">Password</Label>
          <Input
            id="register-password"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border-2 border-black focus:ring-2 focus:ring-green-400 font-['Press_Start_2P'] text-xs"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="font-['Press_Start_2P'] text-xs">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="border-2 border-black focus:ring-2 focus:ring-green-400 font-['Press_Start_2P'] text-xs"
          />
        </div>
        <button
          type="submit"
          className="w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 bg-white border-2 border-black text-black rounded-none font-['Press_Start_2P'] text-sm transform hover:-translate-y-1 transition duration-200 hover:bg-green-400/10"
        >
          Register
        </button>
      </form>
    </>
  );
};

export { AuthModal, LoginForm, RegisterForm };