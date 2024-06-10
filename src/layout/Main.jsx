import { Outlet } from "react-router-dom";

import Header from "../Pages/Shared/Header/Header";
import Footer from "../Pages/Shared/Footer/Footer";
import { Toaster } from 'react-hot-toast';


const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className="min-h-[calc(100vh)]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster />
        </div>
    );
};

export default Main;