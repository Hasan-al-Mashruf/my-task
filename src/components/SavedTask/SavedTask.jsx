import React, { useContext, useEffect, useState } from 'react';

import { AiOutlineEdit } from 'react-icons/ai';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillFileImage } from 'react-icons/ai';
import EditTask from '../../components/EditTask/EditTask';

const SavedTask = () => {
    const [tasks, setTasks] = useState([])
    const [showEditTask, setShowEditTask] = useState(null)
    const [showImage, setShowImage] = useState(false)
    const { loadData, setloadData, setValue, user, setPendingTask } = useContext(AuthContext)

    useEffect(() => {
        fetch(`https://my-task-server-six.vercel.app/task?email=${user?.email}`)
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [loadData, user?.email])
    setPendingTask(tasks.length)
    setloadData(false)

    const editTask = (task) => {
        console.log(task)
        setShowEditTask(task)
    }

    const deleteTask = (id) => {
        console.log(id)
        fetch(`https://my-task-server-six.vercel.app/taskDelete?id=${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.acknowledged) {
                    setloadData(true)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const completeTask = (id) => {
        console.log(id)
        fetch(`https://my-task-server-six.vercel.app/taskComplete?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    setloadData(true)
                    setValue(2)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    console.log(tasks)
    return (
        <div>
            <div className='px-2 py-4 card rounded'>
                <div className='flex justify-between items-center mb-3'>
                    <h4 className='font-bold'>My task</h4>
                    <AiFillFileImage className='mr-1 cursor-pointer' onClick={() => setShowImage(!showImage)} />
                </div>
                <div>
                    {
                        tasks?.map(task =>
                            <div className='relative '>
                                <div className='input rounded mb-12 p-2 '>
                                    <div className='flex justify-between grow items-center overflow-hidden' key={task._id}>
                                        <div>
                                            <h2 className='card-text font-semibold'>{task?.title}</h2>
                                            <h2 className='card-text font-semibold'>{task?.details}</h2>
                                        </div>
                                        <div className='flex items-center cursor-pointer'>
                                            <label htmlFor="my-modal-3" className='cursor-pointer mr-1'>
                                                <AiOutlineEdit onClick={() => editTask(task)} />
                                            </label>
                                            <AiFillDelete onClick={() => deleteTask(task?._id)} />
                                        </div>
                                    </div>
                                    {
                                        task?.image && <img src={task?.image} alt="" className='w-[400px] h-[200px] object-cover rounded' hidden={showImage === false} />
                                    }
                                </div>
                                <div className='absolute -bottom-9 right-0'>
                                    <button className='btn' onClick={() => completeTask(task?._id)}>Complete the task</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {showEditTask && <EditTask task={showEditTask} setShowEditTask={setShowEditTask} />}
        </div>
    );
};

export default SavedTask;