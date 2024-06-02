import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Shared/Login/Login";
import Register from "../Pages/Shared/Register/Register";
import Biodatas from "../Pages/Biodatas/Biodatas";
import ProfileDetails from "../Pages/ProfileDetails/ProfileDetails";
import Checkout from "../Pages/CheckOut/Checkout";
import Dashboard from "../layout/Dashboard";
import EditBiodata from "../Pages/Dashboard/DashboardUser/EditBiodata/EditBiodata";
import ViewBiodata from "../Pages/Dashboard/DashboardUser/ViewBiodata/ViewBiodata";
import MyContactRequest from "../Pages/Dashboard/DashboardUser/MyContactRequest/MyContactRequest";
import FavouriteBiodata from "../Pages/Dashboard/DashboardUser/FavouriteBiodata/FavouriteBiodata";
import AdminDashboard from "../Pages/Dashboard/DashboardAdmin/AdminDashboard/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/DashboardAdmin/ManageUsers/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/DashboardAdmin/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequest from "../Pages/Dashboard/DashboardAdmin/ApprovedContactRequest/ApprovedContactRequest";
import UserHome from "../Pages/Dashboard/DashboardUser/UserHome/UserHome";

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
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      // user dashboard
      {
        path:'/dashboard/userHome',
        element:<UserHome></UserHome>
      },
      {
        path:'/dashboard/editBiodata',
        element:<EditBiodata></EditBiodata>
      },
      {
        path:'/dashboard/viewBiodata',
        element:<ViewBiodata></ViewBiodata>
      },
      {
        path:'/dashboard/contactRequest',
        element:<MyContactRequest></MyContactRequest>
      },
      {
        path:'/dashboard/favoriteBiodata',
        element:<FavouriteBiodata></FavouriteBiodata>
      },

      // admin dashboard
      {
        path:'/dashboard/adminHome',
        element:<AdminDashboard></AdminDashboard>
      },
      {
        path:'/dashboard/manageUsers',
        element:<ManageUsers></ManageUsers>
      },
      {
        path:'/dashboard/approvedPremium',
        element:<ApprovedPremium></ApprovedPremium>
      },
      {
        path:'/dashboard/approvedContactRequest',
        element:<ApprovedContactRequest></ApprovedContactRequest>
      },
    ]
  }
]);
