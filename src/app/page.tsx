"use client";
import { Skeleton } from '@/components/ui/skeleton';
import { checkAuth, selectAuth } from '@/Redux/slices/authSlice';
import { AppDispatch } from '@/Redux/store';
import Button from '@mui/material/Button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await dispatch(checkAuth());
      setIsLoading(false);
    };
    checkAuthentication();
  }, [dispatch]);



  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[50rem] py-2 ">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Welcome to Task Manager
          </h1>
          <p className="mt-3 text-2xl text-slate-600">
            Organize and track your daily tasks.
          </p>
          <div className="flex mt-6">

          {isLoading ? (
            <>
              <div className="space-y-2">
                <Skeleton className="h-10 w-[250px]" />
              </div>
            </>
          ) : isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant='contained' className="font-bold py-2 px-4 rounded mx-2">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant='outlined' className="font-bold py-2 px-4 rounded mx-2">
                    Login
                  </Button>
                </Link>

                <Link href="/register">
                  <Button variant='contained' className="font-bold py-2 px-4 rounded mx-2">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </main>
      </div>
      <footer className="w-full h-24 flex items-center justify-center border-t">
        <p className="text-slate-600">&copy; 2024 Task Manager. All rights reserved.</p>
      </footer>
    </>
  );
}
