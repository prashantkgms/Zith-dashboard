import '@testing-library/jest-dom';
import { server } from './mocks/server'; // Import your mock server
import { TextEncoder, TextDecoder } from 'util'; // Import the polyfills

// Polyfill TextEncoder and TextDecoder for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Start the mock server before tests
beforeAll(() => server.listen());
// Reset any request handlers that may have been added during the tests, so they don't affect other tests
afterEach(() => server.resetHandlers());
// Close the mock server after the tests
afterAll(() => server.close());
