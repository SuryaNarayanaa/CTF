import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { postData } from '../../utils/customFetch';
import { SuccessMessage } from './SuccessMessage';

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {mutate: loginfn, isPending} = useMutation({
    mutationFn: async(formData) => {
        const {data, success, message} = await postData('/back/auth/login', formData);
        if(!success) throw new Error(message);
        return data;
    },
    onSuccess: () => {
      setShowSuccess(true);
      setFormData({email: '', password: ''});
      queryClient.invalidateQueries(['user']);
      setTimeout(onClose, 500);
      navigate('/');
    },
    onError: (err) => {
      console.error('Login failed:', err.message);
      setError(err.message);
    }
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
    loginfn(formData);
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
          disabled={isPending}
          className="w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-6 py-2 bg-white border-2 border-black text-black rounded-none font-['Press_Start_2P'] text-sm transform hover:-translate-y-1 transition duration-200 hover:bg-green-400/10"
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export { LoginForm };