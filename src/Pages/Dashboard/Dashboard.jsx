import React, { useContext, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../AuthProvider/AuthProvider';
import CompletedTask from '../../components/CompletedTask/CompletedTask';
import CreateTask from '../../components/CreateTask/CreateTask';
import PrivateCompo from '../../PrivateCompo/PrivateCompo';
import { BiTask } from 'react-icons/bi';
import { BiNotepad } from 'react-icons/bi';

const Dashboard = () => {
    const { value, setloadData, setValue, user, completedTask, pendingTask } = useContext(AuthContext)
    const [shoeBtn, setShowBtn] = useState(true)
    const navigate = useNavigate()

    const checkBtn = (e) => {
        const title = e.target.value
        const details = e.target.value
        const image = e.target.files
        if (title && details && image) {
            setShowBtn(false)
        }
    }
    const takeTask = (e) => {
        e.preventDefault()
        if (!user) {
            return navigate('/signIn')
        }
        const form = e.target
        const title = form.title.value
        const details = form.details.value
        const image = form.image.files
        const formData = new FormData();
        formData.append('image', image[0]);
        fetch(`https://api.imgbb.com/1/upload?&key=26198e22613019ba3964d468733ea9ea`, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.data.url) {
                    const image = result.data.url
                    const task = {
                        title,
                        details,
                        image,
                        name: user?.displayName,
                        email: user?.email
                    }
                    fetch('https://my-task-server-six.vercel.app/task', {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(task),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success(`${title} is added your list`)
                                form.reset()
                                setloadData(true)
                                setValue(1)
                                setShowBtn(true)
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    console.log(completedTask)
    return (
        <div>
            <div>
                <h2 className='mt-3 mb-5'>Dashboard </h2>
            </div>
            <div className='my-5'>
                <div className='grid md:grid-cols-4 grid-cols-2 gap-5'>
                    <div className='flex items-center justify-between rounded shadow-sm shadow-gray-500/50 px-3 card'>
                        <div className='flex items-center'>
                            <BiNotepad className='text-lg mb-2 mr-1' />
                            <h2 className='mt-3 mb-5 card-text'>Pending Task</h2>
                        </div>
                        <div>
                            <h2 className='mt-3 mb-5 card-text'>0{pendingTask}</h2>
                        </div>
                    </div>
                    <div className='flex items-center justify-between rounded shadow-sm shadow-gray-500/50 px-3 card'>
                        <div className='flex items-center'>
                            <BiTask className='text-lg mb-2 mr-1' />
                            <h2 className='mt-3 mb-5 card-text'>Completed Task</h2>
                        </div>
                        <div>
                            <h2 className='mt-3 mb-5 card-text'>0{completedTask}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`grid md:grid-cols-3 gap-5`}>
                <div>
                    <CreateTask takeTask={takeTask} shoeBtn={shoeBtn} checkBtn={checkBtn} />
                </div>
                <div hidden={value !== 1}>
                    <PrivateCompo />
                </div>
                <div hidden={value !== 2}>
                    <CompletedTask />
                </div>
            </div>
            <Toaster />
        </div>

    );
};

export default Dashboard;