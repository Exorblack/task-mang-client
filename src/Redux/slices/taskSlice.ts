import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { toast } from 'sonner';

interface Task {
  _id: string; 
  title: string;
  description: string;
  date: string;
  category: string;
  completed: boolean;
}

interface CreateTaskPayload {
  title: string;
  description: string;
  date: string;
  category: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
};


//get Token for verefy
async function getToken() {
  const response = await fetch('http://localhost:8080/auth/getToken', {
    method: 'GET',
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error('Failed to get token');
  }
  
  const data = await response.json();
  return data.token;
}



// Thunk to fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const token = await getToken();
  const response = await fetch('http://localhost:8080/tasks/getTasks', {
    method: 'GET',
    credentials: 'include' as RequestCredentials,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
});

// Thunk to create a task
export const createTask = createAsyncThunk<Task, CreateTaskPayload>
('tasks/createTask', async (task) => {
  const token = await getToken();
  const response = await fetch('http://localhost:8080/tasks/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
    credentials: 'include' as RequestCredentials,
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
});

// Thunk to update a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task, { rejectWithValue }) => {
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:8080/tasks/updateTask/${task._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return await response.json();
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to delete a task
export const deleteTask = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
  if (!taskId) {
    return rejectWithValue(`Invalid task ID: ${taskId}`);
  }

  try {
    const token = await getToken();
    const response = await fetch(`http://localhost:8080/tasks/deleteTask/${taskId}`, {
      method: 'DELETE',
      credentials: 'include' as RequestCredentials,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete task');
    }

    const data = await response.json();
    return data;
  } catch (error:any) {
    return rejectWithValue(error.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
        toast.success('Task created successfully');
      })
      .addCase(createTask.rejected, () => {
        toast.error('Failed to create task');
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, () => {
        toast.error('Failed to update task');
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<{ message: string }, string, { arg: string }>) => {
        console.log('Delete task fulfilled. Arg:', action.meta.arg);
        state.tasks = state.tasks.filter(task => task._id !== action.meta.arg);
        toast.success(action.payload.message);
      })
      .addCase(deleteTask.rejected, () => {
        toast.error('Failed to delete task');
      });
  },
});

export const selectTasks = (state: RootState) => state.tasks;
export default taskSlice.reducer;