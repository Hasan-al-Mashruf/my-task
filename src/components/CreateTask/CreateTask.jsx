import React from 'react';
import { AiOutlinePicRight } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdLabel } from 'react-icons/md';

import { FcAddImage } from 'react-icons/fc';

const CreateTask = ({ takeTask, shoeBtn, saveData, checkBtn }) => {

    return (
        <div className='px-2 py-4 rounded card'>
            <div className='flex justify-between items-center'>
                <h4 className='font-medium'>Create your task</h4>
                <AiOutlinePicRight />
            </div>
            <div className='mt-4 flex items-center'>
                <AiOutlinePlusCircle />
                <h4 className='ml-3 font-medium'>Add a task</h4>
            </div>
            <div className='mt-3'>
                <form action="" className='rounded' onSubmit={takeTask}>
                    <div className="form-control">
                        <input type="text" onChange={checkBtn} name="title" placeholder="Title" className="p-1 w-full input rounded rounded-b-none" />
                    </div>
                    <div className="form-control">
                        <input type="text" onChange={checkBtn} name="details" placeholder="Details" className="p-1 w-full input rounded rounded-t-none" />
                    </div>
                    <div className='flex items-center mt-2'>
                        <div>
                            <label htmlFor="" title='select a label'><MdLabel className='text-lg cursor-pointer' /></label>
                        </div>
                        <div className="form-control mx-2">
                            <label htmlFor="file" title='choose image'><FcAddImage className='text-lg cursor-pointer' /></label>
                            <input type="file" onChange={checkBtn} name="image" placeholder="Details" className="p-2 hidden" id='file' />
                        </div>
                    </div>
                    <div className="form-control mt-2">
                        <input type="submit" value="Save task" className='btn bg-gray-700 px-5 py-2 rounded border cursor-pointer' hidden={shoeBtn}  />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;