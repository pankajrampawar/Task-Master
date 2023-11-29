import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditTask() {
    
    const navigate = useNavigate();
    const [taskToEdit, setTaskToEdit] = React.useState({});
    React.useEffect(()=>{
        const taskToEditString = localStorage.getItem('taskToEdit');
        const task = JSON.parse(taskToEditString);
        setTaskToEdit(task);
    }, [])


    const handleChange = (e)=>{
        const {id, value} = e.target;
        setTaskToEdit((prev)=>({
            ...prev,
            [id] : value,
        }))
    }

    const handleSubmit = async()=>{
        const taskArrayString = localStorage.getItem('tasksStored');
        const taskArray = JSON.parse(taskArrayString);
        const index = +taskToEdit.id - 1;
        taskArray[index] = taskToEdit;
        localStorage.setItem('tasksStored', JSON.stringify(taskArray));
        navigate('/')
    }

    const goBack = ()=>{
        navigate('/')
    }

    return (
        <div className='bg-VDB h-screen w-screen flex justify-center items-center'>
            <div className='absolute top-5 left-5'>
                <div className='flex items-center gap-2 text-xl text-white cursor-pointer notoS' onClick={goBack}>
                    <span className='bg-orange-400 p-1 rounded-lg'>Task</span>
                    <span className='underline underline-offset-4 decoration-orange-400'>Master</span>
                </div>
            </div>

             <div className='h-2/3 bg-DB w-1/3 rounded-2xl text-xl flex flex-col justify-evenly gap-3 shadow-2xl p-10 text-slate-300 notoB'>
                <div className='flex flex-col gap-2'>
                    <span className='notoB text-xl'>Task Title</span>
                    <input 
                        className='bg-DBL h-10 px-4 text-lg'
                        type='text'
                        id='title'
                        value={taskToEdit.title}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span>Task Description</span>
                    <input 
                        className='bg-DBL h-10 px-2 notoS text-lg' 
                        type='text'
                        id='description'
                        value={taskToEdit.description}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="priority">Priority</label>
                    <select 
                        id="priority" 
                        name='priority' 
                        className='bg-DBL h-10 pr-4 text-lg notoS'
                        value={taskToEdit.priority}
                        onChange={handleChange}
                    >
                        <option value='3'>Low</option>
                        <option value='2'>Medium</option>
                        <option value='1'>High</option>
                    </select>
                </div>

                <div className='flex justify-end relative'>
                    <button className='bg-orange-400 text-white p-3 rounded-3xl notoB' onClick={handleSubmit}>Save </button>
                </div>
            </div>
        </div>
    );                                                                   
}
