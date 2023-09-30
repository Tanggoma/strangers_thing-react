import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { login } from '../API';

const Login = ({ setToken }) => {

    //Define state 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [showResponseData, setShowResponseData] = useState(false);
    const [loggedUsername, setLoggedUsername] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await login(username, password)

            setResponseData(response);

            if (response.success) {
                setToken(response.data.token, username)
                setShowResponseData(true); // Show response for 5 seconds
                localStorage.setItem('username', loggedUsername)

            } else {
                setError(response.error.message)
            }
            setUsername('');
            setPassword('');

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }

    }
    // Hide response after 3 seconds and redirect to profile page 
    useEffect(() => {
        if (showResponseData) {
            setTimeout(() => {
                setShowResponseData(false);
                navigate('/profile');
            }, 3000);
        }
    }, [showResponseData, navigate]);

    return (
        <div className='login-body'>
            <div className='login-container'>
                <h2> Log in</h2>
                <form onSubmit={handleSubmit} className='login-form'>
                    <label >
                        <input
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                    , setLoggedUsername(e.target.value)
                            }}
                            required
                        />
                    </label><br></br>
                    <label>
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label><br />
                    <button id='login-button' type='submit'> Log In</button>
                </form >

                {!responseData && !showResponseData && (
                    <div className='login-p'>
                        <p> Don't have account?
                            Click to <NavLink to='/register' id='link-signup'> Signup </NavLink>
                        </p>
                    </div>
                )}

                {showResponseData && responseData && responseData.data && (
                    <>
                        <h1 className='login-response'>{responseData.data.message} <br /> ....Redirect to All posts page.... </h1>

                    </>
                )}
                {!showResponseData && responseData && responseData.error && (
                    <>
                        <h1 className='login-response'>{error}</h1>
                    </>
                )}
            </div>
        </div>)
}

export default Login