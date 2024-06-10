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
import PrivateAuth from "../PrivateAuth/PrivateAuth";
import AdminRoute from "../PrivateAuth/AdminRoute";
import GotMarried from "../Pages/Dashboard/DashboardUser/GotMarried/GotMarried";
import SuccessStory from "../Pages/Dashboard/DashboardAdmin/SuccessStory/SuccessStory";
import ErrorPage from "../ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/biodatas",
        element: <Biodatas></Biodatas>,
      },
      {
        path: "/profileDetails/:id",
        element: (
          <PrivateAuth>
            <ProfileDetails></ProfileDetails>
          </PrivateAuth>
        ),
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateAuth>
            <Checkout></Checkout>
          </PrivateAuth>
        ),
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
    path: "/dashboard",
    element: <PrivateAuth><Dashboard></Dashboard></PrivateAuth>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      // user dashboard
      {
        path: "/dashboard/userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "/dashboard/editBiodata",
        element: <EditBiodata></EditBiodata>,
        // loader:()=>fetch('http://localhost:5000/membersCount')
      },
      {
        path: "/dashboard/viewBiodata",
        element: <ViewBiodata></ViewBiodata>,
      },
      {
        path: "/dashboard/contactRequest",
        element: <MyContactRequest></MyContactRequest>,
      },
      {
        path: "/dashboard/favoriteBiodata",
        element: <FavouriteBiodata></FavouriteBiodata>,
      },
      {
        path:"/dashboard/gotMarried",
        element:<GotMarried></GotMarried>
      },

      // admin dashboard
      {
        path: "/dashboard/adminHome",
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
      },
      {
        path: "/dashboard/manageUsers",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>,
      },
      {
        path: "/dashboard/approvedPremium",
        element: <AdminRoute><ApprovedPremium></ApprovedPremium></AdminRoute>,
      },
      {
        path: "/dashboard/approvedContactRequest",
        element: <AdminRoute><ApprovedContactRequest></ApprovedContactRequest></AdminRoute>,
      },
      {
        path:"/dashboard/successStory",
        element:<AdminRoute><SuccessStory></SuccessStory></AdminRoute>
      }
    ],
  },
]);
