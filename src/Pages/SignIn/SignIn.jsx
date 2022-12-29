import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Button from '../../components/Button/Button';
const provider = new GoogleAuthProvider();

const SignIn = ({ width }) => {
    const { loginUser, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const signInUser = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        loginUser(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate('/')
            })
            .catch((error) => console.error(error));
    }
    const googleSignIn = () => {
        googleLogin(provider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                navigate('/')
                // ...
            }).catch((error) => console.error(error));
    }
    console.log(width)
    return (
        <div className={width === false ? 'w-full mx-auto border bg-gray-700 rounded' : 'md:w-2/5 mx-auto mt-12 border bg-gray-700 rounded'}>
            <form action="" className='rounded m-3' onSubmit={signInUser}>
                <div className="form-control my-2">
                    <input type="text" name="email" placeholder="Email" className="p-2 bg-[#0e0d0d87] w-full rounded" />
                </div>
                <div className="form-control my-2">
                    <input type="text" name="password" placeholder="Password" className="p-2 bg-[#0e0d0d87] w-full rounded" />
                </div>
                <div className="form-control my-2">
                    <Link to={'/signUp'}><p>Don't have an account, <span className='text-red-500'>signup here</span></p></Link>
                </div>
                <div className="form-control my-3 text-right">
                    <button className='btn border border-[#696969]'>Sign in</button>
                </div>
            </form>
            <div className='text-center my-2'>
                <button onClick={googleSignIn} className='btn border border-[#696969]'>Google signIn</button>
            </div>
        </div >
    );
};

export default SignIn;