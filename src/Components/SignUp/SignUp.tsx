import React, {useState} from 'react';
import {Button, TextField, Typography} from '@mui/material';
import {useNavigate, useSearchParams} from 'react-router-dom'; //  <-- For programmatic navigation
import styles from './SignUp.module.scss';

function SignUp({ onUserFetched }: { onUserFetched: (user: any) => void }) {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const ref = searchParams.get('ref') || '';

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const toggleMode = () => {
        setIsLogin((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const fetchUserInfo = async (token: string) => {
        try {
            const response = await fetch('http://localhost:8081/auth/getUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                return await response.json();
            } else {
                return null;
            }
        } catch (err) {
            console.error('Error fetching user info:', err);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const endpoint = isLogin
                ? 'http://localhost:8081/auth/login'
                : 'http://localhost:8081/auth/registration';

            const body = isLogin
                ? {
                    username: formData.username,
                    password: formData.password,
                }
                : {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    ref: ref
                };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {if (response.ok) {
                const data = await response.json();
                if (isLogin) {
                    localStorage.setItem('token', data.token || '');
                    alert('Login successful!');

                    console.log('data.token == = ' , data.token);
                    const userData = await fetchUserInfo(data.token);
                    if (userData) {
                        console.log('userData12553 == ', userData);
                        onUserFetched(userData);
                        navigate('/profile');
                    }
                } else {
                    alert(
                        `Registration successful! Your referral link: ${
                            data.referralLink || 'No link returned'
                        }`
                    );

                    if (data.token) {
                        localStorage.setItem('token', data.token || '');
                        const userData = await fetchUserInfo(data.token);
                        if (userData) {
                            onUserFetched(userData);
                            navigate('/profile');
                        }
                    }
                }
            }
            }
        } catch (error) {
            alert(isLogin ? 'Error during login' : 'Error during registration');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <Typography variant="h4" className={styles.title}>
                    {isLogin ? 'Login' : 'Registration'}
                </Typography>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        data-testid="username"
                        sx={{ marginBottom: 2 }}
                    />

                    {!isLogin && (
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            data-testid="email"
                            sx={{ marginBottom: 2 }}
                        />
                    )}

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        data-testid="password"
                        sx={{ marginBottom: 2 }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        data-testid="submit"
                        sx={{ marginBottom: 2 }}
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </Button>
                </form>

                <Button variant="outlined" onClick={toggleMode}>
                    {isLogin ? 'Need an account? Register here' : 'Already have an account? Login here'}
                </Button>
            </div>
        </div>
    );
}

export default SignUp;