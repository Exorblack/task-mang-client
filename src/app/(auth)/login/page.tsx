'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from "sonner"
import { AppDispatch } from '@/Redux/store';
import { login } from '@/Redux/slices/authSlice';

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Loginpage = () => {
  type LoginForm = z.infer<typeof loginSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const resultAction = await dispatch(login(data));
      if (login.fulfilled.match(resultAction)) {
        toast.success('Login Successful!', { duration: 1000 });
        router.push("/dashboard");
      } else {
        toast.error('Invalid email or password', { duration: 1000 });
      }
    } catch (error) {
      toast.error('An error occurred', { duration: 1000 });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-[50rem] ">
        <div className="w-full max-w-sm rounded-md shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Login to Your Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="text-slate-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                {...register('email')}
              />
              {errors.email && (<span className="text-red-500 text-xs">{errors.email.message}</span>)}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-slate-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                {...register('password')}
              />
              {errors.password && (<span className="text-red-500 text-xs">{errors.password.message}</span>)}
            </div>
            <Button
              type="submit"
              variant='contained'
              className="w-full rounded-md py-2 text-center text-white font-bold"
            >
              Login
            </Button>
          </form>
          <div className='pt-5'>
            <span>Don't have an account yet? - <Link href={'/register'} className='text-blue-700'>Sign up</Link></span>
          </div>
        </div>
      </div>
      <footer className="w-full h-24 flex items-center justify-center border-t">
        <p className="text-slate-600">&copy; 2024 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Loginpage;
