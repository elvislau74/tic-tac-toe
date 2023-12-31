import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Error from './pages/Error.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import Game from './pages/Game.jsx'
import Signup from './pages/Signup.jsx'
import GameHistory from './pages/GameHistory.jsx';

// creates routes for each page and component
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/play-game',
        element: <Game />
      },
      {
        path: '/game-history',
        element: <GameHistory />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
]);

// renders our components and app to the page
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
