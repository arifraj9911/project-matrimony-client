import { Outlet } from "react-router-dom";

import Header from "../Pages/Shared/Header/Header";
import Footer from "../Pages/Shared/Footer/Footer";


const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className="min-h-[calc(100vh)]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;