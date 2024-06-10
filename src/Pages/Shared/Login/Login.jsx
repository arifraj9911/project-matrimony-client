import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(data)

    signIn(email, password)
      .then((res) => {
        // console.log(res.user);

        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
        };

        axios
          .post("https://project-matrimony-server.vercel.app/users", userInfo, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => toast.error(err.message));

        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        // console.log(res.user);
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
        };

        axios
          .post("https://project-matrimony-server.vercel.app/users", userInfo, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => toast.error(err.message));
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="">
      <div className=" bg-gray-50 py-20">
        <h2 className="text-2xl text-center mb-8 font-semibold ">
          Sign in to your account
        </h2>
        <div className="w-1/3 mx-auto  p-10 bg-white shadow rounded-md">
          <form
            className="flex flex-col space-y-6 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200   dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              placeholder="your email"
              type="email"
              {...register("email")}
            />
            <input
              className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200   dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              type="password"
              placeholder="your password"
              {...register("password")}
            />
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" name="" id="" />
                <span>Remember me</span>
              </div>
              <div>
                <p className="text-blue-500">
                  <Link to="">Forgotten Password</Link>
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform rounded-md bg-primary  lg:w-auto "
            >
              Login
            </button>
          </form>
          <p className="mt-4">
            New to account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
          <hr className="my-4" />
          <div className="flex items-center gap-2   justify-center">
            <button
              className="flex items-center border mt-4 rounded-md p-2 gap-2"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="text-3xl" />
              <span>Google Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
