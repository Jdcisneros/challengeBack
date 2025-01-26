```md
# ToDoList App - Backend
```

This is the backend of the Task Management App built with Node.js, Express, Typescript and a database (PostgreSQL). It handles API requests such as adding, editing, deleting tasks, and fetching task data.

## Setup Instructions

To set up and run this backend application locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Jdcisneros/challengeBack.git
```

### 2. Install dependencies
Navigate to the backend project directory:

```bash
cd challengeBack
```

Then, install all required dependencies:

```bash
npm install
```
### 3. Set up environment variables
In the backend directory, create a .env file to configure your environment variables. Example:

``` bash
DATABASE_URL=your-database-url
JWT_SECRET=your-secret-key
PORT=5000
```
Make sure to update these values based on your configuration.

### 4. Start the development server
To start the backend server in development mode, run the following command:

```bash
npm run dev
```
The server will start running on http://localhost:5000 by default.

### Running Tests
For the backend, you can use Jest or any other testing library you prefer. To run the backend tests, follow these steps:

Go to the backend directory:
```bash
cd challengeBack
```
Run the tests:
```bash
npm run test
```
