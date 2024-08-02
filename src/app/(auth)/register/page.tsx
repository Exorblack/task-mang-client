'use client'
import React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import * as z from "zod";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store';
import { register as registerUser } from '@/Redux/slices/authSlice';


const registerSchema = z.object({
  name:z.string()
  .min(4,"name must be at least 4 characters")
  .max(45,"there is no name like that ???"),
  email:z.string().email("enter valid email"),
  password:z.string().min(8,"enter at least 6 character"),
})


const Register = () => {

  type RegisterForm = z.infer<typeof registerSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const resultAction = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success('Account Created Successfully!', { duration: 1000 });
        router.push("/dashboard");
      } else {
        toast.error('Email already exists', { duration: 2000 });
      }
    } catch (error) {
      toast.error('An error occurred', { duration: 2000 });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[50rem] ">
        <div className="w-full max-w-sm rounded-md shadow-md p-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Creat Free Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className=" text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50"
                {...register('name')}
              />
              {errors.name && (<span className="text-red-500 text-xs">{errors.name.message}</span>)}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className=" text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50"
                {...register('email')}
                />
                {errors.email && (<span className="text-red-500 text-xs">{errors.email.message}</span>)}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className=" text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50"
                {...register('password')}
              />
              {errors.password && (<span className="text-red-500 text-xs">{errors.password.message}</span>)}
            </div>
           
            <Button
              type="submit"
              variant='contained'
              className="w-full rounded-md  py-2 text-center text-white focus:outline-none font-bold"
            >
              Register
            </Button>
          </form>

            <div className='pt-5'>
              <span>already have account - <Link href={'/login'} className='text-blue-700'>Login</Link></span>
            </div>
        </div>
      </div>
      <footer className="w-full h-24 flex items-center justify-center border-t">
        <p className="text-slate-600">&copy; 2024 Task Manager. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Register;
