import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store';
import { updateTask } from '@/Redux/slices/taskSlice';
import { FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface Task {
    _id: string; 
    title: string;
    description: string;
    date: string;
    category: string;
    completed: boolean;
  }

interface EditTaskModalProps {
    task: Task;    
  }


  const EditTask: React.FC<EditTaskModalProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTask(editedTask));
    handleClose();
  };


  return (
    <React.Fragment>
      <button onClick={handleClickOpen}>
        <FaRegEdit className="h-5 w-5 text-teal-400 hover:text-teal-600" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What are you gonna Change today?
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={editedTask.title}
            onChange={handleChange}
            className="mt-2 w-full border-b border-slate-300 focus:outline-none focus:border-blue-600 transition duration-150 ease-in-out"

          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="mt-2 w-full border-b border-slate-300 focus:outline-none focus:border-blue-600 transition duration-150 ease-in-out"
            placeholder="Description"
          />
          <div className="pt-3">
            <InputLabel id="date">Date</InputLabel>
            <input 
                type="date"
                name="date"
                value={editedTask.date.split('T')[0]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md mb-2"
             />
          </div>
          <div className="pt-3">
            <select
                name="category"
                value={editedTask.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md mb-4"
                required
                
            >
                <option value="All" disabled >All Categories</option>
                <option value="personal">Personal</option>
                <option value="education">education</option>
                <option value="shopping">shopping</option>
                <option value="work">Work</option>
                <option value="health">Health</option>
          </select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Cancel</Button>
          <Button variant='contained' type="submit">Save Changes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default EditTask;
