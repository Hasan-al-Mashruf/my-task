import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Button from '../../components/Button/Button';

const SignUp = () => {
    const { createUser, updateName } = useContext(AuthContext)
    const createUserData = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const userData = {
            name, email, password
        }
        console.log(userData)
        createUser(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user) {
                    updateName(name)
                    console.log(user)
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <div className='md:w-2/5 mx-auto mt-12 border bg-gray-700 rounded'>
            <form action="" className='rounded m-3' onSubmit={createUserData}>
                <div className="form-control my-2">
                    <input type="text" name="name" placeholder="Name" className="p-2 bg-[#0e0d0d87] w-full rounded" />
                </div>
                <div className="form-control my-2">
                    <input type="text" name="email" placeholder="Email" className="p-2 bg-[#0e0d0d87] w-full rounded" />
                </div>
                <div className="form-control my-2">
                    <input type="text" name="password" placeholder="Password" className="p-2 bg-[#0e0d0d87] w-full rounded" />
                </div>
                <div className="form-control my-3 text-right">
                    <Button text={'Sign up'}/>
                </div>
            </form>
        </div>
    );
};

export default SignUp;