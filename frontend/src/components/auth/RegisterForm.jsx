import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { postData } from '../../utils/customFetch';
import { SuccessMessage } from './SuccessMessage';
import { login } from '../../redux/slices/authSlice';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    team_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: registerfn, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data, success, message } = await postData(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, formData);
      if (!success) throw new Error(message);
      return data;
    },
    onSuccess: (data) => {
      dispatch(login(data));
      setShowSuccess(true);
      setFormData({ team_name: '', email: '', password: '', confirmPassword: '' });
      queryClient.invalidateQueries(['user']);
      setTimeout(onClose, 500);
      navigate("/");
    },
    onError: (err) => {
      console.error('Register failed:', err.message);
      setError(err.message);
    }
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    registerfn(formData);
  };

  return (
    <>
      {showSuccess && (
        <SuccessMessage message="Registration and team creation successful! Welcome aboard!" />
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-white border-2 border-black p-2 text-red-500 text-xs text-center font-['Press_Start_2P']">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="username" className="font-['Press_Start_2P'] text-xs">Team Name</Label>
          <Input
            id="team_name"
            type="text"
            name="team_name"
            placeholder="Enter your team name"
            value={formData.team_name}
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
          disabled={isPending}
          className="w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 bg-white border-2 border-black text-black rounded-none font-['Press_Start_2P'] text-sm transform hover:-translate-y-1 transition duration-200 hover:bg-green-400/10"
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </>
  );
};

export { RegisterForm };
