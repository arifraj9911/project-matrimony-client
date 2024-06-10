import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { PacmanLoader } from "react-spinners";


const PrivateAuth = ({children}) => {

    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <PacmanLoader color="#36d7b7" />
    }

    if(user){
        return children;
    }


    return <Navigate state={location?.pathname} to='/login' replace></Navigate>;
};

export default PrivateAuth;