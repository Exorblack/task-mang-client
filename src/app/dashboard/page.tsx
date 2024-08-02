"use client"
import Addtask from '@/components/popupcreate';
import AddTaskp from '@/components/popupcreate+';
import EditTaskModal from '@/components/popupdate';
import { deleteTask, fetchTasks, selectTasks, updateTask } from '@/Redux/slices/taskSlice';
import { AppDispatch } from '@/Redux/store';
import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector(selectTasks);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  //completed // incompleted
  const toggleTaskStatus = (id: string) => {
    const task = tasks.find(task => task._id === id);
    if (task) {
      dispatch(updateTask({ ...task, completed: !task.completed }));
    }
  };


  //delete
  const handleDeleteTask = (taskId: string) => {
    if (!taskId) {
      toast.error('Cannot delete task: Invalid ID');
      return;
    }
    dispatch(deleteTask(taskId));
  };

  //edit task


  const filteredTasks = selectedCategory === 'All' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);


  return (
    <div className="min-h-screen bg-slate-50">
      <div className='container'>
        <h1 className="text-4xl font-bold text-center text-slate-900 my-5">Task Management Dashboard</h1>
        <div className='py-5 flex justify-between'>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="text-slate-900 bg-slate-200 rounded px-4 py-2 cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="personal">Personal</option>
            <option value="education">education</option>
            <option value="shopping">shopping</option>
            <option value="work">Work</option>
            <option value="health">Health</option>
          </select>
            <AddTaskp/>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTasks.map((task) => (
            <div key={task._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
              <div className='max-w-full'>
                <h3 className={` text-xl font-semibold mb-2 text-slate-800 ${task.completed ? 'line-through' : ''} break-words overflow-hidden overflow-ellipsis`}>{task.title}</h3>
                <p className={`text-slate-600 text-sm mb-4 ${task.completed ? 'line-through' : ''} break-words overflow-hidden overflow-ellipsis`}>{task.description}</p>
                <p className={`text-slate-500 text-xs ${task.completed ? 'line-through' : ''}`}>{task.date.split('T')[0]}</p>
              </div>
              <span className="w-fit bg-slate-200 rounded-full px-3 py-1 text-sm font-semibold text-slate-700 mt-2">
                  {task.category}
              </span>
              <div className="flex justify-between items-center mt-4">
                <button 
                  onClick={() => toggleTaskStatus(task._id)}
                  className={`px-2 py-1 rounded-sm text-sm text-white ${task.completed ? 'bg-green-500' : 'bg-slate-500'}`}
                >
                  {task.completed ? 'Completed' : 'Incomplete'}
                </button>
                <div className="flex space-x-2">
                  <EditTaskModal task={task}/>
                  <button onClick={() => handleDeleteTask(task._id)}>
                    <FiTrash2 className="h-5 w-5 text-red-400 hover:text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Addtask/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
