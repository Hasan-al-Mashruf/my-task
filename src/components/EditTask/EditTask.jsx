import React, { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { AiFillCloseCircle } from 'react-icons/ai';

const EditTask = ({ task, setShowEditTask }) => {
    const { setloadData } = useContext(AuthContext)
    const { _id, title, details } = task
    console.log(task)
    const updateTask = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const details = form.details.value
        const updateData = {
            title, details
        }
        console.log(updateData)

        fetch(`https://my-task-server-six.vercel.app/updateTask?id=${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success(`${title} is updated`)
                    setShowEditTask(null)
                    setloadData(true)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div>
            <div className='absolute top-0 left-1/2 card md:w-[25%] w-[70%] p-3 rounded 
            -translate-x-1/2'>
                <form action="" className='rounded relative' onSubmit={updateTask}>
                    <div className="form-control">
                        <input type="text" name="title" placeholder="Title" className="p-2 bg-[#0e0d0d87] w-full" defaultValue={title} />
                    </div>
                    <div className="form-control">
                        <input type="text" name="details" placeholder="Details" className="p-2 bg-[#0e0d0d87] w-full" defaultValue={details} />
                    </div>
                    <div className="form-control hidden">
                        <input type="submit" value="" />
                    </div>
                    <div className='absolute top-0 right-0'>
                        <AiFillCloseCircle className='text-xl cursor-pointer' onClick={() => setShowEditTask()} />
                    </div>
                </form>
                <Toaster />
            </div>
        </div>
    );
};

export default EditTask;