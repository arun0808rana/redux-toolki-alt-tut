import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../features/user';
import { logout } from '../features/user';

function Login() {
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(login({
            name: 'arun',
            age: 29,
            email: 'arungmail'
        }))
    }
    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Login