# Dynamic To-Do List Application

This is a dynamic to-do list application built with the MERN stack (MongoDB, Express, React, Node.js). The application features three sections: Pending, In Progress, and Completed. Users can add tasks, move tasks between sections, and optionally use drag-and-drop functionality.

## Features

- **Pending**: Contains newly added tasks. Each task has a button to move it to In Progress.
- **In Progress**: Contains tasks currently being worked on. Each task has a button to move it to Completed.
- **Completed**: Contains completed tasks with a timestamp in the format "DD/MM/YY, HH" (e.g., 20/05/2024, 19:50).

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)
- MongoDB (MongoDB Atlas)

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/sree-shp/to-do-list.git
cd to-do-list
```

### Install Dependencies

Navigate to the "client" directory and install dependencies:

```sh
cd client
npm install
```

 Navigate to the "server" directory and install dependencies:

 ```sh
cd ../server
npm install
```

### Setup Environment Variables

Create a .env file in the server directory and add the following variables:

```sh
PORT=4000
DATABASE_URL=mongodb://<username>:<password>@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority
```
Replace <username> and <password> with your actual MongoDB credentials. For local development, you can use:

Create a .env file in the client directory and add the following variables:

```sh
VITE_REACT_APP_API_BASEURL=http://localhost:4000
```

### Run the Application 

**Client** 
Start the client development server:

```sh
cd client
npm run dev
```

The frontend server should now be running on http://localhost:5173.

 **Server**
 Start the backend server

 ```sh
cd ../server
npm start
```

The backend server should now be running on http://localhost:4000.

## Usage
1. Open your browser and navigate to http://localhost:3000.
2. Add tasks in the Pending section.
3. Move tasks to In Progress using the provided button.
4. Move tasks to Completed using the provided button. Completed tasks will display a timestamp.

## API Endpoints
1. GET /api/v1/task - Retrieve all tasks
2. POST /api/v1/task - Create a new task
3. PUT /api/v1/task/:id - Update a task
