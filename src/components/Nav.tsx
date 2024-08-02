'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar } from '@mui/material';
import Link from 'next/link';
import { AppDispatch } from '@/Redux/store';
import { checkAuth, logout, selectAuth } from '@/Redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Skeleton } from './ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Nav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector(selectAuth);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await dispatch(checkAuth());
      setIsLoading(false);
    };
    checkAuthentication();
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="w-full py-4 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-3xl font-bold text-gray-800" href={'/'}>
          Task Manager
        </a>
        <nav>
          {isLoading ? (
            <>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </>
          ) : isAuthenticated ? (
            <>
              <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar alt="sharp" src="" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer'>
                      <Link href={'/profile'}>
                          Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                      <Link href={'/dashboard'}>
                          Tasks
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>  
                          <span className='text-red-500'>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outlined" className="font-bold py-2 px-4 rounded mx-2">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="contained" className="font-bold py-2 px-4 rounded mx-2">
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;