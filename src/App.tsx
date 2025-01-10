import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUp from './Components/SignUp/SignUp';
import UserProfile from './Components/Profile/UserProfile';

function App() {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenAndFetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:8081/auth/getUser', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                        navigate('/profile');
                    } else {
                        localStorage.removeItem('token');
                    }
                } catch (err) {
                    console.error('Error validating token:', err);
                    localStorage.removeItem('token');
                }
            }
        };

        checkTokenAndFetchUser();
    }, [navigate]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SignUp
                        onUserFetched={(fetchedUser) => {
                            setUser(fetchedUser);
                            navigate('/profile');
                        }}
                    />
                }
            />

            <Route
                path="/profile"
                element={
                    user ? <UserProfile mainUser={user} /> : <Navigate to="/" />
                }
            />
        </Routes>
    );
}

export default App;