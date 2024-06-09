import Banner from "../Banner/Banner";
import GetMarriage from "../GetMarriage/GetMarriage";
import HowItWorks from "../HowItWorks/HowItWorks";
import Premium_Members from "../Premium_Members/Premium_Members";
import SuccessMarriage from "../SuccessMarriage/SuccessMarriage";


const Home = () => {
    return (
        <div >
            
            <Banner></Banner>
            <Premium_Members></Premium_Members>
            <HowItWorks></HowItWorks>
            <SuccessMarriage></SuccessMarriage>
            <GetMarriage></GetMarriage>
        </div>
    );
};

export default Home;