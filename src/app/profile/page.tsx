"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLinkedinProfile } from '@/Redux/slices/linkedinSlice';
import { AppDispatch, RootState } from '@/Redux/store';
import Button from '@mui/material/Button';
import Linkedin from '@/components/linkedin';

interface LinkedInProfile {
  name: string;
  profileUrl: string;
  photoUrl: string;
  email: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector((state: RootState) => state.linkedin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setProfileUrl(profile.profileUrl);
    }
  }, [profile]);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-24 w-24 rounded-full object-cover"
            src={profile?.photoUrl || "https://via.placeholder.com/150"}
            alt={profile?.name}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {profile?.name || 'User Profile'}
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="profileUrl" className="sr-only">
                Profile URL
              </label>
              <input
                id="profileUrl"
                name="profileUrl"
                type="url"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Profile URL"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
              />
            </div>
          </div>
          <div>
            {/* <Button
              type="submit"
              variant='contained'
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Profile
            </Button> */}
            <div className='pt-5'>
              <Linkedin />
            </div>
          </div>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
