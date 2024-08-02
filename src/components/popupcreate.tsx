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
import { FiPlus } from 'react-icons/fi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/store';
import { createTask } from '@/Redux/slices/taskSlice';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

const AddTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setDate(null);
    setCategory('');
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && description && date && category) {
      dispatch(createTask({
        title,
        description,
        date: date.toISOString(),
        category,
        completed: false,
      }));
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <button
        className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center hover:bg-slate-50 transition duration-300"
        onClick={handleClickOpen}
      >
        <FiPlus className="h-6 w-6 mr-2 text-slate-600" />
        Add New Task
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
            What are you gonna do today?
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaAutosize
            aria-label="Description"
            minRows={3}
            placeholder="Enter task description"
            className="mt-2 w-full border-b border-slate-300 focus:outline-none focus:border-blue-600 transition duration-150 ease-in-out"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="pt-3">
            <InputLabel id="date">Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
                className="w-full py-2 border rounded-md mb-2"
              />
            </LocalizationProvider>
          </div>
          <div className="pt-3">
            <Select
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              fullWidth
              variant="standard"
              required
            >
              <MenuItem value="" disabled>Select Category</MenuItem>
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="shopping">Shopping</MenuItem>
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="health">Health</MenuItem>
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined'  onClick={handleClose}>Cancel</Button>
          <Button variant='contained' type="submit">Add Task</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddTask;
