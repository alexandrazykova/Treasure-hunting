import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail';
// import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import OrderHistory from './pages/OrderHistory';
import SavedProducts from './pages/SavedProducts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, 
      // {
      //   path: '/profiles/:profileId',
      //   element: <Profile />
      // },
      {
        path: '/products/:id',
        element: <Detail />
      },{
        path: '/products/:id',
        element: <OrderHistory />
      },{
        path: '/saved',
        element: <SavedProducts />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)