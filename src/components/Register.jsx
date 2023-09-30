import { useState } from "react";
import { registerUser } from "../api/index";
import { Link } from "react-router-dom";

const Register = ({ setToken }) => {

    // Define State
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isChecked1, setisChecked1] = useState(false);
    const [isChecked2, setisChecked2] = useState(false);

    // Event handle 
    const handleCheckbox1 = (e) => {
        setisChecked1(e.target.checked);

    }
    const handleCheckbox2 = (e) => {
        setisChecked2(e.target.checked);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // check username and password requirement
        if (username.length < 5 || username.includes(' ')) {
            setError('Username must have at least 5 characters and no spaces.');
            return;
        }

        if (!isPasswordValid()) {
            alert("Password must meet the pattern requirements");
            return;
        }

        try {
            const response = await registerUser(username, password);

            if (response.success) {
                setResponseData(response);
                setToken(response.data.token);
            } else {
                setResponseData(response);
                setError(response.error.message)
            }

            setUserName('');
            setPassword('');
        }

        catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('Error:', error);
        }
        setIsUsernameFocused(false);
        setIsPasswordFocused(false);
    }

    const handleUsernameFocus = () => {
        setIsPasswordFocused(false);
        setIsUsernameFocused(true);
    };

    const handlePasswordFocused = () => {
        setIsUsernameFocused(false);
        setIsPasswordFocused(true);
    };

    // Check if Password Valid
    const isPasswordValid = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        return passwordRegex.test(password);
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <h2> Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={username}
                            placeholder="*Username"
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            onClick={handleUsernameFocus}
                            pattern="^\S{5,}$"
                        />

                    </label><br />
                    {isUsernameFocused && username.length < 5 && (
                        <p id="requirement" style={{ color: 'teal' }}>Username must be at least 5 characters long and no white spaces.</p>
                    )}
                    <label>
                        <input
                            type="password"
                            placeholder="*Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={handlePasswordFocused}
                            required
                        />
                    </label><br />
                    {isPasswordFocused && !isPasswordValid() && (
                        <div id="requirement" style={{ color: 'teal' }}>
                            Password must contain at least 6 characters and include at least 2 of the following: an uppercase letter, a lowercase letter, a number, or a special symbol.
                            <p> {password}</p>
                        </div>

                    )}

                    <label htmlFor="checkboxId" className="custom-checkbox-label">
                        <input
                            type="checkbox"
                            id="checkboxId"
                            className="styled-checkbox"
                            checked={isChecked1}
                            onChange={handleCheckbox1} /> Sign me up for email updates from Tanggoma. </label><br />
                    <label htmlFor="checkboxId2" className="custom-checkbox-label">
                        <input
                            type="checkbox"
                            id="checkboxId2"
                            className="styled-checkbox"
                            required
                            checked={isChecked2}
                            onChange={handleCheckbox2} /> I agree to the Terms of Use and Privacy Notice <span style={{ color: "red" }}>*</span> </label>

                    <button id='signup-button' type="submit"> Sign up</button>

                </form>

                {responseData && responseData.error && (
                    <>
                        <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>
                        <p style={{ textAlign: 'center', margin: '1rem' }}>Click here to <Link to='/login'> Login </Link></p>
                    </>)}
                {responseData && responseData.data &&

                    (<>
                        <h2 style={{ fontSize: '2.5rem', color: 'green' }} className="register-response">{responseData.data.message}</h2>
                        <p style={{ textAlign: 'center' }} > Click here to <Link to='/login'>login </Link> </p>

                    </>)}
            </div>
        </div>
    )
}


export default Register