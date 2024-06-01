import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Shared/Login/Login";
import Register from "../Pages/Shared/Register/Register";
import Biodatas from "../Pages/Biodatas/Biodatas";
import ProfileDetails from "../Pages/ProfileDetails/ProfileDetails";
import Checkout from "../Pages/CheckOut/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path:'/biodatas',
        element:<Biodatas></Biodatas>
      },
      {
        path:'/profileDetails/:id',
        element:<ProfileDetails></ProfileDetails>
      },
      {
        path:'/checkout/:id',
        element:<Checkout></Checkout>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
