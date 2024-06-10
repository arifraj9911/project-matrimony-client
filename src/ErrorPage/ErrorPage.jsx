import { Button } from "flowbite-react";
import errorImg from "../assets/Images/error.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center my-20">
      <Link to="/">
        <Button className="bg-primary ">Back To Home</Button>
      </Link>
      <img width={600} src={errorImg} alt="" />
    </div>
  );
};

export default ErrorPage;
