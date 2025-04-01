import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import PrivateRoute from './utils/privateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSuccess } from './redux/authSlice';
import { getUsers } from './api/authApi';

const App = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const fetchUsers = async () => {
            try {
                const userData = await getUsers();
                const filteredUser = userData.find(user => user.token === token);
                if (filteredUser) {
                    dispatch(getUserSuccess(filteredUser));
                }
            } catch (err) {
                console.error('Error fetching users', err);
            }
        };

        if (token) {
            fetchUsers();
        }
    }, [dispatch]);

    return (
        <ThemeProvider theme={createTheme({ palette: { mode } })}>
            <Router>
                <div className="flex">
                    <div className="flex-1">
                        <Header />
                        <main className="p-4">
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                                <Route path="/posts" element={<PrivateRoute element={<Posts />} />} />
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
