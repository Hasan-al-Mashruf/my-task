import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications } from 'react-icons/md';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const MenuBar = () => {
    const { setValue, logOutuser, user } = useContext(AuthContext)
    const [menuheight, setMenuHeight] = useState(true)

    const [theme, setTheme] = useState('dark-theme')
    const toggleTheme = () => {
        console.log(10)
        if (theme === 'dark-theme') {
            setTheme('light-theme')
        } else {
            setTheme('dark-theme')
        }
    }
    useEffect(() => {
        document.body.className = theme
    }, [theme])

    console.log(theme)
    return (
        <div>
            <nav className='flex items-center justify-between bg-gray-700 py-4 px-6 text-white'>
                <div>
                    <HiOutlineMenuAlt2 className='text-xl cursor-pointer' onClick={() => setMenuHeight(!menuheight)} />
                </div>
                <div>
                    <h2 className='text-lg'>My Task</h2>
                </div>
                {
                    user && <div>
                        <h2 className='text-lg hidden md:block'>{user?.displayName}</h2>
                    </div>
                }
                <div className='flex items-center'>
                    <h2 onClick={toggleTheme} className='cursor-pointer'> { theme === 'dark-theme' ? 'Light theme' : 'Dark theme'}</h2>
                    <AiOutlineSearch className='text-xl mx-2' />
                    <MdNotifications className='text-xl' />
                </div>
            </nav>
            <div className='cursor-pointer'>
                <ul className={menuheight ? "absolute overflow-hidden h-0"
                    : "absolute bg-gray-700 rounded-box w-52 overflow-hidden mt-2 left-[5px] p-3 rounded "}>
                    <li><Link to='/' onClick={() => setValue(0)} className='text-white'>Add Task</Link></li>
                    <li className='my-3'><Link to='/' onClick={() => setValue(1)} className='text-white'>My Task</Link></li>
                    <li><Link to='/' onClick={() => setValue(2)} className='text-white'>Completed Task</Link></li>
                    {
                        user ? <><li className='mt-2'><Link onClick={logOutuser} className='text-white '>Sign out</Link></li></> : <><li className='mt-2'><Link to='/signIn' onClick={''} className='text-white'>Sign in</Link></li></>
                    }

                </ul>
            </div>
        </div>
    );
};

export default MenuBar;