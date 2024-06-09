import { CiLogout } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { IoDocumentsOutline } from "react-icons/io5";
import { RiContactsBook3Line, RiHomeWifiLine } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Dashboard = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  const { data: userStatus = [], isPending } = useQuery({
    queryKey: ["usersData", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${user.email}`,{
        headers:{
          authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      });
      // console.log(res.data);
      return res.data;
    },
  });

  console.log(userStatus);

  if(isPending){
    return <p>Loading...</p>
  }

  return (
    <div className="flex gap-6">
      <div className="w-96 bg-[#FFF5E0] min-h-screen text-center">
        <div className="mb-16  font-bold w-3/4 mx-auto flex flex-col  items-start mt-12">
          <h2 className="text-3xl uppercase mb-2">Love Nest</h2>
          <p className="font-normal">Find your soulmate</p>
          <ul className="space-y-5  uppercase font-semibold w-full mt-8  flex flex-col items-start">
            {!isAdmin ? (
              <>
                <li className="flex items-center gap-2 justify-center">
                <RiHomeWifiLine />
                  <NavLink to="/dashboard/userHome">
                    <span>User Home</span>
                  </NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <FiEdit />
                  <NavLink to="/dashboard/editBiodata">
                    <span>Edit Biodata</span>
                  </NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <GrDocumentText />
                  <NavLink to="/dashboard/viewBiodata">View Biodata</NavLink>
                </li>
                {
                  userStatus?.status !== 'premium' && <li className="flex items-center gap-2 justify-center">
                  <RiContactsBook3Line />
                  <NavLink to="/dashboard/contactRequest">
                    My Contact Request
                  </NavLink>
                </li>
                }
                
                <li className="flex items-center gap-2 justify-center">
                  <IoDocumentsOutline />
                  <NavLink to="/dashboard/favoriteBiodata">
                    Favorites Biodata
                  </NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <IoDocumentsOutline />
                  <NavLink to="/dashboard/gotMarried">
                    Got Married
                  </NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CiLogout />
                  <NavLink to="/">Logout</NavLink>
                </li>
              </>
            ) : (
              
              <>
                <li className="flex items-center gap-2 justify-center">
                <RiHomeWifiLine />
                  <NavLink to="/dashboard/adminHome">
                    <span>Admin Dashboard</span>
                  </NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <GrDocumentText />
                  <NavLink to="/dashboard/manageUsers">Manage Users</NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <RiContactsBook3Line />
                  <NavLink to="/dashboard/approvedPremium">
                    Approved Premium
                  </NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <IoDocumentsOutline />
                  <NavLink to="/dashboard/approvedContactRequest">
                    Approved Contact Request
                  </NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <IoDocumentsOutline />
                  <NavLink to="/dashboard/successStory">
                    Success Story
                  </NavLink>
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CiLogout />
                  <NavLink to="/">Logout</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="flex-1 p-12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
