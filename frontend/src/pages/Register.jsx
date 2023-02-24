import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import './styles/Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password1: '',
        password2: ''
    });

    const { email, firstName, lastName, password1, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, msg } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(msg);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, msg, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (email === '' || password1 === '' || password2 === '' || firstName === '' || lastName === '') {
            toast.error('Please fill out all fields');
        } else if (password1 !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                email,
                firstName,
                lastName,
                password: password1
            };

            dispatch(register(userData));
        }
    };


    return (
        <main>
            <div className="auth-container">
                <div className="form-header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>
                    <h1 className="title-2 text-center">Register</h1>
                </div>
                <div className="auth-form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password1">Password *</label>
                            <input
                                type="password"
                                name="password1"
                                id="password1"
                                placeholder="Enter your password"
                                value={password1}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Confirm Password *</label>
                            <input
                                type="password"
                                name="password2"
                                id="password2"
                                placeholder="Confirm your Password"
                                value={password2}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn w-100">
                            Register
                        </button>
                    </form>
                    <p className="mt-1 text-end">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register