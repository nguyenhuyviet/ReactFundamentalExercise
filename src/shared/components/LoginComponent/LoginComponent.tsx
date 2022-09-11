import React from 'react'
import UserContext from '../../../contexts/UserContext/UserContext'
import Axios from 'axios'
import './LoginComponent.css'

interface LoginRequest {
    email: string,
    password: string
}

const LoginComponent = () => {
    const [values, setValues] = React.useState<LoginRequest>({
        email: '',
        password: ''
    });

    const { token, setUser } = React.useContext(UserContext);

    const baseURL = 'https://60dff0ba6b689e001788c858.mockapi.io/tokens'

    const [errors, setErrors] = React.useState<string[]>([]);

    const handleOnChange = (evt: any) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })

        setErrors([]);
    }

    const handleLogout = (evt: any) => {
        if (setUser)
        {
            localStorage.setItem('token', '');
            localStorage.setItem('userId', '');
            setUser({id: '', token: '', name: '', createdAt: ''});
        }
    }

    const validateEmail = (mail: string) =>
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }

        return (false)
    }

    const HandleSubmit = (evt: any) => {
        evt.preventDefault();
        let errorSummary = [];
        if (!values.email)
        {
            errorSummary.push('Email is required');
        }

        if (!validateEmail(values.email))
        {
            errorSummary.push('Email has wrong format')
        }

        if (values.password.length < 8)
        {
            errorSummary.push('Password requires at least 8 characters');
        }

        setErrors(errorSummary);

        if (errorSummary.length === 0)
        {
            if (setUser)
            {
                Axios.get(baseURL).then((response: any) => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    setUser({id: response.data.userId, token: response.data.token, name: '', createdAt: ''});
                })         
            }
        }
    }

    return (
        <div>
            {token && <button onClick={handleLogout}>Logout</button>}
            {!token && <div>
                <h1 className='page-title'>Login</h1>
                <form>
                    <input
                        className='line-input'
                        value={ values.email}
                        onChange = { handleOnChange }
                        type = "text"
                        placeholder='Email'
                        name='email'
                    >
                    </input>
                    <input
                        className='line-input'
                        value={ values.password}
                        onChange = { handleOnChange }
                        type = "password"
                        placeholder='password'
                        name='password'
                    >
                    </input>
                    <div className='error-summary'>
                        {errors.map(error => (
                            <span className='error'>{error}</span>
                        ))}
                    </div>
                    <button 
                        className='line-input'
                        type='submit'
                        onClick={ HandleSubmit }>Submit
                    </button>
                </form>
            </div>}
        </div>
    );
}

export default LoginComponent