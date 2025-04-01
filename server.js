const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
server.use(cors());

// Use default middlewares (logger, static, etc.)
server.use(middlewares);

// Set up your API routes
server.use('/api', router);  // Example of prefixing routes with "/api"

// Start the server
server.listen(5000, () => {
  console.log('JSON Server is running on http://localhost:5000');
});
