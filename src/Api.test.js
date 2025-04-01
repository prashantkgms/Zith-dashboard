import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Ensure your store path is correct
import App from './App';
import { getUserSuccess } from './redux/authSlice'; // If you use this action for user authentication
import { getUsers } from './api/authApi';

// Mocking API calls and Redux-related imports
jest.mock('./api/authApi', () => ({
    getUsers: jest.fn()
}));

jest.mock('./redux/authSlice', () => ({
    getUserSuccess: jest.fn()
}));

// Mock PrivateRoute Component
jest.mock('./utils/privateRoute', () => ({
    __esModule: true,
    default: ({ element }) => element // Simplify PrivateRoute logic for testing
}));

// Mock useSelector and useDispatch for Redux
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
    useSelector: (selector) => mockUseSelector(selector),
}));

beforeEach(() => {
    mockDispatch.mockClear();
    mockUseSelector.mockReturnValue({ mode: 'light' }); // Mocking the theme mode to light
    
    // Mock user data returned from the API
    getUsers.mockResolvedValue([
        { token: 'sample-token', name: 'John Doe' }
    ]);

    // Mock the user data getting success action
    getUserSuccess.mockReturnValue({ type: 'GET_USER_SUCCESS', payload: { token: 'sample-token', name: 'John Doe' } });
});

describe('App.js', () => {
    it('renders App and routes correctly', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Test if Login page is rendered initially (when user is not logged in)
        expect(screen.getByText(/Login/)).toBeInTheDocument();

        // Mocking successful login
        sessionStorage.setItem('token', 'sample-token');
        await waitFor(() => getUsers());

        // Test if Dashboard page is rendered after successful login
        expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
    });

    it('renders the correct page based on route', async () => {
        sessionStorage.setItem('token', 'sample-token');
        
        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Wait for successful user fetching
        await waitFor(() => getUsers());

        // Navigate to Profile page
        fireEvent.click(screen.getByText(/Profile/)); // Assuming there is a link to Profile page
        expect(screen.getByText(/Profile/)).toBeInTheDocument();

        // Navigate to Posts page
        fireEvent.click(screen.getByText(/Posts/)); // Assuming there is a link to Posts page
        expect(screen.getByText(/Posts/)).toBeInTheDocument();
    });

    it('checks theme toggle functionality', () => {
        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Test if theme icon is in the document
        const themeIcon = screen.getByRole('button', { name: /toggle theme/i });
        expect(themeIcon).toBeInTheDocument();

        // Simulate clicking the theme toggle button
        fireEvent.click(themeIcon);

        // Assuming toggleTheme action was dispatched, check if it was called
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('handles missing token gracefully', () => {
        sessionStorage.removeItem('token'); // Remove token from sessionStorage

        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Test that the user is redirected to the login page
        expect(screen.getByText(/Login/)).toBeInTheDocument();
    });

    it('renders the theme correctly based on Redux state', () => {
        mockUseSelector.mockReturnValue({ mode: 'dark' }); // Mock dark mode

        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Check if the theme is set to dark mode
        const body = document.body;
        expect(body.classList.contains('dark')).toBeTruthy(); // Assuming you apply a class for dark mode
    });
});
