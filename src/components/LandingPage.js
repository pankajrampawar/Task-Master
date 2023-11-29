import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function LandingPage() {

    const navigate = useNavigate(); 
    const [tasksArray, setTaskArray] = React.useState([]); // tasksArray
    const [allTaskDelted, setAllTaskDeleted] = React.useState(false) //  used to update the local storage if length == 0;
    const { newTask } = useParams();
    console.log(newTask);

    React.useEffect(()=>{ // update the array and througn stored task
        const taskArrayString = localStorage.getItem('tasksStored');
        if (taskArrayString) {
            const parsedArrayString = JSON.parse(taskArrayString);
            setTaskArray(parsedArrayString);
        } 
    }, [])
    

    const addNew = ()=>{
        navigate('/AddTask')
    }

    const handleEdit = (id)=> {
        const taskToEdit = tasksArray.find(task => task.id === id);
        localStorage.setItem('taskToEdit', JSON.stringify(taskToEdit));
        navigate(`/editTask/`)
    }

    const completeTask = (id) => {
        setTaskArray((prevTasks) => {
          return prevTasks.map((task) => {
            if (task.id === id) {
              return { ...task, completed: true };
            }
            return task;
          });
        });
      };

    // Update the local storage when tasksArray changes
    React.useEffect(() => {
        if(tasksArray.length > 0 || allTaskDelted) {
            localStorage.setItem('tasksStored', JSON.stringify(tasksArray));
        }
    }, [tasksArray]);

    // function to handle delete
    const handleDelete = (id)=>{
        setAllTaskDeleted(()=>{
            if(tasksArray.length <= 1) {
                return true;
            }
        })
        setTaskArray((prevState)=>prevState.filter((task)=> task.id !== id));
    }

return (
  <div className='bg-VDB w-full h-screen text-white'>
    <nav className='p-4 text-xl bg-DB flex justify-between items-center px-8 notoS shadow-2xl absolute top-0 w-full'>
        <div className='flex items-center gap-2'>
            <span className='bg-orange-400 p-1 rounded-lg'>Task</span>
            <span className='underline underline-offset-4 decoration-orange-400'>Master</span>
        </div>
        <div>
            <button className='bg-orange-400 p-1 rounded-lg px-3' onClick={addNew}>New Task</button>
        </div>
    </nav>

    <div className='flex pt-28 px-10 gap-10 flex-wrap justify-center bg-VDB'>
        {tasksArray.length === 0 ? 
            <div className='flex flex-col items-center'>
                <div className='mt-44 text-3xl notoB tracking-widest'>
                    NO <span className='bg-orange-400 rounded-lg p-2'>Tasks</span> ADDED
                 </div> 
            </div>
                    : tasksArray.map((task)=>(           
            <div 
                key={task.title} 
                className={`bg-DB min-w-[230px] flex flex-col p-4 gap-4 shadow-lg rounded-xl 
                            ${task.priority === '1' ? 'shadow-red-600' : task.priority === '2' ? 'shadow-red-400' : 'shadow-red-200'} 
                            ${task.completed ? 'hidden' : 'flex'}`}
            >      
                <span 
                    className='notoS text-xl tracking-widest underline underline-offset-4 decoration-orange-400'
                >
                    {task.title}
                </span>
                <p>
                    {task.description}
                </p>
                <span>
                    {task.priority === '1' ? 'High priority' : task.priority === '2' ? 'Mid priority' : 'Low Priority'}
                </span>
                <span className='text-md'>
                    Date added: {task.date}
                </span>
                <div className='flex items-center justify-between'>
                <div className='flex justify-start gap-3 text-lg'> 
                    <button onClick={()=>{handleEdit(task.id)}}>
                        <img src='/images/pen.png' alt='edit icon' className='h-5'/>
                    </button>
                    <button onClick={()=>{handleDelete(task.id)}}>
                        <img src='/images/delete.png' alt='delete icon'className='h-5'/>
                    </button>
                </div>
                <button className='text-xl rounded-2xl bg-orange-400 p-2' onClick={()=>completeTask(task.id)}>Done</button>
                </div>
            </div>
        ))}
    </div>

    <div className='flex w-screen justify-center pt-32 bg-VDB gap-6 pb-24 flex-wrap'>
        {tasksArray === 0 ? '' : tasksArray.map((task)=>{
            return(
                <div>
                    {task.completed && 
                    <div 
                    key={task.title} 
                    className={`bg-DB max-w-[230px] flex flex-col p-4 gap-2 shadow-lg rounded-xl shadow-green-600`}>      
                     <span 
                         className='notoS text-xl tracking-widest line-through decoration-orange-400 decoration-4'
                     >
                         {task.title}
                     </span>
                     <span className='text-md'>
                         Date completed: {task.date}
                     </span>
                        <button onClick={()=>{handleDelete(task.id)}}>
                            <img src='/images/delete.png' alt='delete icon'className='h-5'/>
                        </button>
                     </div>
                    }
                </div>
            )
        })}
    </div>
  </div>
)
}