##Worldwise

##Overview
Worldwise is a web application built using React, React Router, and Context API with a focus on the use of reducers for state management. The app was created to help learn and practice modern React concepts such as routing, context, and state management.

##Features
React Router: Seamless navigation between different parts of the app (Product, Pricing, Cities, etc.).
Context API: Centralized state management using Context API for sharing global state across components.
Reducers: Heavily using reducers to manage complex state transitions, particularly in handling asynchronous actions.
Protected Routes: Ensures authenticated users are granted access to protected routes like the app dashboard.
Cities and Countries: Displays a list of cities and countries, which can be expanded into detailed views.
##Technologies
React: A JavaScript library for building user interfaces.
React Router: For managing navigation and routing within the app.
Context API: To manage the global state.
Reducer: For state management with more complex actions and transitions.
Vite: A fast build tool that provides fast refresh and production-ready builds.
Installation
To get started with this project, follow these steps:

##Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/worldwise.git
##Navigate to the project directory:

bash
Copy
Edit
cd worldwise
Install dependencies:

bash
Copy
Edit
npm install
##Run the development server:

bash
Copy
Edit
npm run dev
##Open your browser and visit http://localhost:5173 to view the app.

Build for production:
##To create a production-ready build:

bash
Copy
Edit
npm run build
This will generate a production build in the dist folder.

Important note the website i am hosting on doesnt support json server and as a result wont be able to modify or read the json i was using
to be able to use the full website download it from the instructions and run it

Website
You can see the live version of the project by visiting this link https://chipper-fox-c8705e.netlify.app/.
