# Social Job Platform (React.js + JSON Server)

A small social job platform built with React.js that includes features like user authentication (login/logout), profile management, job posts, a dashboard with charts, and more. The backend is simulated using **JSON Server** for development purposes.

## Features:
- **Profile Management**: Users can log in, view their profiles, and log out.
- **Job Posts**: Users can view and post jobs.
- **Dashboard**: A simple dashboard with charts to visualize job data.
- **Authentication**: Basic login/logout flow.

## Technologies Used:
- **Frontend**: React.js, Material UI, Chart.js
- **Backend**: JSON Server (Simulated API)
- **Authentication**: Local authentication using a mock database (JSON Server)

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Clone the Repository](#clone-the-repository)
- [Install Dependencies](#install-dependencies)
- [Running the Frontend](#running-the-frontend)
- [Running the Backend](#running-the-backend)
- [Building the App](#building-the-app)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Conclusion](#conclusion)

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (with npm) – [Install Node.js](https://nodejs.org/)
- **npm** – Node package manager (comes with Node.js)
- **Git** – Version control (optional, but useful for cloning the repo)

---

## Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/yourusername/social-job-platform.git
cd social-job-platform

---


## **Install Dependencies**
Once you’ve cloned the repository, navigate to the project directory and install the necessary dependencies for both the frontend and the backend.

Frontend Setup:
Navigate to the frontend directory:

cd Zith-dashboard

Now Install the frontend dependencies using npm:

npm install

Backend Setup (JSON Server):

Navigate to the root directory where the db.json file is located:

npm install json-server --save-dev

Running the Backend (JSON Server)
In order to simulate the backend, you need to run JSON Server.

Navigate to the root directory where your db.json is located.

Run JSON Server on port 5000:

npx json-server --watch db.json --port 5000


Building the App
To create a production build of the React application:

Navigate to the Zith-dashboard directory (if you're not already there):

cd Zith-dashboard

Run the build command:

npm run build

Conclusion

With the backend set up using JSON Server and the frontend using React.js, you now have a fully functioning small social job platform. Enjoy using the app, and feel free to modify it to fit your needs!
