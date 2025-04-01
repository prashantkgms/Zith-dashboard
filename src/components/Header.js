import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle, Logout, BurstModeOutlined } from '@mui/icons-material';
import { logoutFormSuccess } from '../redux/authSlice';
import { toggleTheme } from '../redux/themeSlice';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness7';
import logo from '../logo.webp';

const Header = () => {
    const [showDialog, setShowDialog] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    const mode = useSelector((state) => state.theme.mode);

    const handleSignOutClick = () => {
        setShowDialog(true);
    };

    const handleConfirmLogout = () => {
        setShowDialog(false);
        sessionStorage.removeItem('token');
        dispatch(logoutFormSuccess());
        navigate('/login');
    };

    const handleCancelLogout = () => {
        setShowDialog(false);
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <header className={`p-4 text-white flex justify-between items-center ${mode === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
            {!isLoginPage ? (
                <>
                    <nav className="flex flex-grow flex-start">
                        <Link to="/dashboard" className="mr-4">
                            <img
                                src={logo}
                                alt="Dashboard Image"
                                className="w-[100px] h-[35px]"
                            />
                        </Link>
                        <Link to="/posts" className="mr-4">
                            <BurstModeOutlined
                                style={{ color: mode === 'light' ? "grey" : "white" }}
                                className="mr-2 text-2xl mt-2"
                            />
                        </Link>
                    </nav>

                    <nav className="flex items-center ml-auto mt-2">
                        <IconButton onClick={handleThemeToggle} color="inherit">
                            {mode === 'light' ? (
                                <DarkModeIcon style={{ color: 'grey' }} className="text-2xl" />
                            ) : (
                                <LightModeIcon style={{ color: 'white' }} className="text-2xl" />
                            )}
                        </IconButton>

                        <Link to="/profile" className="mr-4 flex items-center">
                            <AccountCircle
                                style={{ color: mode === 'light' ? "grey" : "white" }}
                                className="mr-2 ml-2 text-2xl"
                            />
                        </Link>
                        <button
                            onClick={handleSignOutClick}
                            className="mr-4 flex items-center"
                        >
                            <Logout
                                style={{ color: mode === 'light' ? "grey" : "white" }}
                                className="mr-2 text-2xl"
                            />
                        </button>
                    </nav>
                </>
            ) : (
                <nav className="flex flex-grow justify-center">
                    <Link to="/dashboard" className="mr-4">
                        <img
                            src={logo}
                            alt="Dashboard Image"
                            className="w-[100px] h-[35px]"
                        />
                    </Link>
                </nav>
            )}

            {/* Confirmation Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className={`p-6 rounded shadow-lg max-w-sm w-full ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className={`text-xl font-semibold mb-4 ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                            Confirm Sign Out
                        </h2>
                        <p className={`mb-6 ${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                            Are you sure you want to sign out?
                        </p>
                        <div className="flex justify-between mt-12">
                            <button
                                onClick={handleCancelLogout}
                                className={`px-4 py-2 rounded ${mode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
