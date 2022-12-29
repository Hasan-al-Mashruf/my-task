import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MenuBar from '../components/MenuBar/MenuBar';

const Main = () => {
    const [hasan, setHasan] = useState('hasan')
    return (
       
        <div>
            <MenuBar />
            <div className='md:w-[1300px] md:mx-auto w-[100%]'>
                <Outlet />
            </div>
        </div>
    );
};

export default Main;