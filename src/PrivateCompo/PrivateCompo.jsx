import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import SavedTask from '../components/SavedTask/SavedTask';
import SignIn from '../Pages/SignIn/SignIn';

const PrivateCompo = () => {
    const { user} = useContext(AuthContext)

    if (!user) {

        return <SignIn width={false} />;
    }

    if (user) {
        return <SavedTask />;
    }
};

export default PrivateCompo;