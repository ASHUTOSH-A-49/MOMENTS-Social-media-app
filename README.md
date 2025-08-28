Moments: A MERN Stack Social Media App 📸
Welcome to Moments, a full-stack social media application built to connect users and share meaningful experiences. This platform allows users to create, edit, and interact with posts in a seamless and intuitive way.

🌟 Features
User Authentication: Secure sign-in and sign-up functionality.

Google OAuth: Seamless sign-in using your Google account.

CRUD Posts: Create, Read, Update, and Delete your own posts.

Interaction: Like and comment on other users' posts.

Search & Filter: Find posts quickly by title or tags.

Pagination: Easily navigate through a large number of posts.

Responsive Design: A clean, mobile-friendly user interface built with Material-UI.

💻 Tech Stack

Moments is a full-stack application built with the MERN stack.

🌐 Frontend

React: A JavaScript library for building the user interface.

Redux: Used for predictable state management across the application.

Material-UI (MUI): A popular React UI framework for a beautiful design.

Vite: A fast build tool for modern web projects.

Axios: A promise-based HTTP client for making API requests.

💾 Backend

Node.js: The JavaScript runtime environment.

Express.js: A fast, minimalist web framework for building the API.

MongoDB: A NoSQL database for storing application data.

Mongoose: An elegant ODM (Object Data Modeling) library for MongoDB.

JSON Web Tokens (JWT): For secure user authentication.

🛠️ Installation and Setup

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js (v18 or higher)

MongoDB Atlas account

Git

Steps
Clone the repository:

git clone <your-repository-url>
cd moments-social-media-app

Backend Setup:

Navigate to the server directory and install the dependencies.

cd server
npm install

Create a .env file in the server directory and add your environment variables:

MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET_TOKEN=<your_secret_token>

Frontend Setup:

Navigate to the client directory and install the dependencies.

cd ../client
npm install

Create a .env file in the client directory and add your environment variables:

VITE_SERVER_URL=<your_server_url>
VITE_OAUTH_CLIENT_ID=<your_google_oauth_client_id>

Run the application locally:
You need to start both the client and server separately.

From the server directory:

npm start

From the client directory:

npm run dev

Your application should now be running locally!

🚀 Deployment

This application is deployed as a full-stack monorepo on Render.

Backend: Deployed as a Node.js Web Service.

Frontend: Deployed as a Static Site.

Live Application

You can view the live application here: https://moments-client-g6rp.onrender.com

🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

👤 Author
Ashutosh

GitHub: @ASHUTOSH-A-49

📝 License
This project is licensed under the MIT License.
