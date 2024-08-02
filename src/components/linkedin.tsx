import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { fetchLinkedinProfile } from '@/Redux/slices/linkedinSlice';
import { AppDispatch } from '@/Redux/store';

const Linkedin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGetData = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(fetchLinkedinProfile({ email, password }));
  };

  return (
    <div >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='contained'>Scrap LinkedIn</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Your LinkedIn Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click get data when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleGetData} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="password" className="text-right">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" variant='contained'>Get your data</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Linkedin;
