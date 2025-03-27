# retro-reel-backend

Retro-Reel - Project README

🎵 Description
The frontend of Retro Reel is a React application built using Vite. This app allows users to search, discover, and save their favorite films from the 80s and 90s. It communicates with the backend API to display film data, let users log in, save films, and interact with the app in an easy-to-use interface. The frontend features a clean UI/UX for an engaging experience, making it easy to explore the magic of 80s and 90s cinema.

🔗 Related Repositories

- The frontend repository handles the user interface and interacts with the backend API.

- The backend repository can be found here:

https://github.com/PonyTailExpress/retro-reel-backend

🛠️ How to Run the App Locally
Follow the steps below to get the app running on your local machine:

1. Clone the repository
   To get a local copy of the project, open a terminal and run the following command:

git clone https://github.com/PonyTailExpress/retro-reel-frontend.git

2. Install dependencies
   Once you have cloned the project, navigate to the project folder and install the necessary dependencies:

- cd retro-reel-frontend

- npm install

3. Set up environment variables
   This project requires certain environment variables for API keys or other settings. Here's how to set them up:

Create a .env file in the root directory and add the following variables:

VITE_API_URL=http://localhost:5000
VITE_OMDB_API_URL=http://www.omdbapi.com/
VITE_OMDB_API_KEY=7ffceb24

4. Run the application
   After setting up the environment variables, run the following command to start the development server:

   npm run dev

   The frontend app should now be running at http://localhost:5173.

🌐 Demo
You can view the live demo of the application at:

https://retro-reel.netlify.app/

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
