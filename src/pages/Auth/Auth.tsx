import React, {useEffect, useState} from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Auth.module.scss';
import {User} from "../../types/global.types";
import {getUser} from "../../services/user";

interface AuthProps {
    onUserFetched: (user : User) => void;
}

const Auth: React.FC<AuthProps> = ({ onUserFetched }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const referralCode = searchParams.get('ref') || '';

    const toggleMode = () => setIsLogin((prev) => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (!referralCode && !isLogin) {
            setIsLogin(true);
        }
    }, [referralCode]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const endpoint = isLogin
            ? `${import.meta.env.VITE_BACK_END_URL}/auth/login`
            : `${import.meta.env.VITE_BACK_END_URL}/auth/registration`;

        const payload = isLogin
            ? { username: formData.username, password: formData.password }
            : { ...formData, ref: referralCode };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Request failed');
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                const userInfo = await getUser(data.token);

                if (userInfo) {
                    onUserFetched(userInfo);
                    navigate('/profile');
                }
            } else {
                setFormData({ email: '', password: '', username: '' });
                setIsLogin(true)
            }
        } catch {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <Typography variant="h4" className={styles.title}>
                    {isLogin ? 'Login' : 'Registration'}
                </Typography>

                {error && (
                    <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}

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

                {!isLogin && (
                    <Button variant="outlined" onClick={toggleMode}>
                        Already have an account? Login here
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Auth;