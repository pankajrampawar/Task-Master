import React from 'react';
import { useNavigate } from 'react-router-dom';
import quotes from './quote.json';

export default function AddTask() {

    const quotes = require('./quote.json');
    const [num, setNum] = React.useState() // change the number of quote
    const [quote, setQuote] = React.useState({}) // holds the quote   
    const navigate = useNavigate();
    
    const goBack = ()=>{
        navigate(`/`);
    }


    // React state for the task
    const [newTask, setNewTask] = React.useState({
        title: '',
        description: '',
        priority: null,
        completed: false,
        date: null,
    })

    const [infoFilled, setInfoFilled] = React.useState(true); // State for checking if the information is filled

    // function to change the value of the inputs
    const handleChange = (e)=>{
        const { id, value} = e.target
        setNewTask((prevState)=>({
            ...prevState,
            [id]: value
        }))
    }

    // functiont to handle priority 
    const handlePriority = (e)=>{
        const priority = e.target.id;
        setNewTask((prevState)=>({
            ...prevState,
            priority: priority
        }))
    }

    //function to give out date and month
    const getDateAndMonth = ()=>{
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        return day + '/' + month;
    }
    React.useEffect(()=>{
        //update task date
        const date = getDateAndMonth();
        setNewTask((prev)=>({...prev, date: date}));

        //update the num
        setNum(()=>{
            const num = Math.floor(Math.random()*5);
            setQuote(quotes[num]);
        })
    },[])

    // function handling submit of new task
    const handleSubmit = async()=>{
        if(newTask.title === '' || newTask.description === '' || newTask.priority === null) {
            setInfoFilled(false);
        } else {
            const taskArrayString = localStorage.getItem('tasksStored');
            if(taskArrayString) {
                const taskArray = await JSON.parse(taskArrayString);
                const finalTask = newTask;
                finalTask.id = taskArray.length + 1;
                taskArray.push(finalTask);
                const updatedTaskArrayString = JSON.stringify(taskArray);
                localStorage.setItem('tasksStored', updatedTaskArrayString);
                navigate('/')
            } else {
                const finalTask = newTask;
                finalTask.id = 1;
                const taskArray = [finalTask];
                const updatedTaskArrayString = JSON.stringify(taskArray);
                localStorage.setItem('tasksStored', updatedTaskArrayString);
                navigate('/')
            }
        }
    }

 
return (
    <div className='bg-VDB h-screen w-screen text-gray-300 notoB notoS'>
        {/** navigation and logo */}
        <nav className=' absolute p-4'>
            <div className='flex items-center gap-2 text-xl text-white cursor-pointer notoS' onClick={goBack}>
                <span className='bg-orange-400 p-1 rounded-lg'>Task</span>
                <span className='underline underline-offset-4 decoration-orange-400'>Master</span>
            </div>
        </nav>

        {/* tabs */}

        <div className='h-full w-full flex justify-center items-center gap-40'>
            {/* Qoute */}
            <div className='h-2/3 w-1/3 bg-DB rounded-2xl shadow-2xl hidden md:block'>
                <div data-testid="quote"className='h-2/3 flex justify-center items-center text-2xl roboto text-center px-14 tracking-wider leading-relaxed myDiv rounded-t-2xl '>
                    {quote.quote}
                </div>
                <div className='h-1/3 flex justify-between items-center text-xl notoS pl-8'>
                    <span className='underline underline-offset-4 decoration-orange-400' data-testid="author">{quote.author}</span>
                    <img src={quote.image} className='w-1/2 h-full rounded-br-2xl rounded-tl-2xl' data-testid="author-image"/>
                </div>
            </div>
            {/* Form */}
            <div className='h-2/3 bg-DB w-1/3 rounded-2xl text-xl flex flex-col justify-evenly  shadow-2xl p-10 '>
                <div className='flex flex-col gap-2'>
                    <span>Task Title</span>
                    <input 
                        className='bg-DBL h-10 px-4'
                        type='text'
                        id='title'
                        value={newTask.title}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <span>Task Description</span>
                    <input 
                        className='bg-DBL h-10 px-4 notoS' 
                        type='text'
                        id='description'
                        value={newTask.description}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col gap-6'>
                    <span>Priority</span>
                    <div className='flex justify-evenly'>
                        <button className={`${newTask.priority === '1' ? 'bg-green-300' : 'bg-DBL'} ${newTask.priority === '1' ? 'text-black' : 'white'} rounded-3xl w-16 h-12 shadow-sm shadow-green-200 hover:text-black hover:bg-green-200`} onClick={handlePriority} id={'1'}>High</button> 
                        <button className={`${newTask.priority === '2' ? 'bg-green-400' : 'bg-DBL'} ${newTask.priority === '2' ? 'text-black' : 'white'} rounded-3xl w-16 h-12 shadow-sm shadow-green-400 hover:text-black hover:bg-green-400`} onClick={handlePriority} id={'2'}>Mid</button> 
                        <button className={`${newTask.priority === '3' ? 'bg-green-600' : 'bg-DBL'} ${newTask.priority === '3' ? 'text-black' : 'white'} rounded-3xl w-16 h-12 shadow-sm shadow-green-600 hover:text-black hover:bg-green-600`} onClick={handlePriority} id={'3'}>Low</button></div>
                </div>

                <div className='flex justify-end relative'>
                    <button className='bg-orange-400 text-white p-3 rounded-3xl' onClick={handleSubmit}>Add </button>
                    { !infoFilled ? <p className='text-red-400 text-sm notoS absolute top-16'>Please fill all the information</p> : null }
                </div>
            </div>

        </div>
    </div>
 )
}