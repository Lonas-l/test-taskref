import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SignUp from './pages/Auth/Auth';
import UserProfile from './pages/Profile/UserProfile';

function App() {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenAndFetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
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