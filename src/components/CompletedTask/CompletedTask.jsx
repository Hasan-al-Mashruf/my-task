import React, { useContext, useEffect, useState } from 'react';
import { AiOutlinePicRight } from 'react-icons/ai';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { AiFillDelete } from 'react-icons/ai';
import Button from '../Button/Button';

const CompletedTask = () => {
    const [tasks, setTasks] = useState([])
    const { loadData, setloadData, setValue, user, setCompletedTask } = useContext(AuthContext)
    useEffect(() => {
        fetch(`https://my-task-server-six.vercel.app/taskCompleted?email=${user?.email}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setTasks(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [loadData, user?.email])
    console.log(tasks)
    setCompletedTask(tasks.length)

    const unCompleteTask = (id) => {
        console.log(id)
        fetch(`https://my-task-server-six.vercel.app/taskNotComplete?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    setloadData(true)
                    setValue(1)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const deleteCompleteTask = (id) => {
        console.log(id)
        fetch(`https://my-task-server-six.vercel.app/completedTaskDelete?id=${id}`, {
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

    return (
        <div className='px-2 py-4 rounded card'>
            <div className='flex justify-between items-center'>
                <h4>Completed Task</h4>
                <AiOutlinePicRight />
            </div>
            {
                tasks?.map(task => <div key={task._id}>
                    <div className='relative'>
                        <div className='flex items-center justify-between input p-2 rounded mt-2 mb-12'>
                            <div>
                                <h2 className='card-text'>{task.title}</h2>
                                <h3 className='card-text'>{task.details}</h3>
                            </div>
                            <div className='flex items-center cursor-pointer'>
                                <AiFillDelete onClick={() => deleteCompleteTask(task?._id)} />
                            </div>
                        </div>
                        <div className='absolute -bottom-9 right-0'>
                            <button className='btn' onClick={() => unCompleteTask(task?._id)}>Not completed</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default CompletedTask;