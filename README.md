#Worldwise

Worldwise is a web application built using React, React Router, and Context API with a focus on the use of reducers for state management. The app was created to help learn and practice modern React concepts such as routing, context, and state management.

#Features

React Router: Seamless navigation between different parts of the app (Product, Pricing, Cities, etc.).
Context API: Centralized state management using Context API for sharing global state across components.
Reducers: Heavily using reducers to manage complex state transitions, particularly in handling asynchronous actions.
Protected Routes: Ensures authenticated users are granted access to protected routes like the app dashboard.
Cities and Countries: Displays a list of cities and countries, which can be expanded into detailed views.
#Setup

To get started with this project, follow these steps:

Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/worldwise.git
cd worldwise
Install dependencies:

bash
Copy
Edit
npm install
Run the development server:

bash
Copy
Edit
npm run dev
Open your browser and visit http://localhost:5173 to view the app.

Build for production:

bash
Copy
Edit
npm run build
This will generate a production-ready build in the dist folder.

#Technologies Used

React: A JavaScript library for building user interfaces.
React Router: For managing navigation and routing within the app.
Context API: To manage the global state.
Reducer: For state management with more complex actions and transitions.
Vite: A fast build tool that provides fast refresh and production-ready builds.
