import { Button } from "flowbite-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(data)

    signIn(email, password)
      .then((res) => {
        console.log(res.user);

        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
        };

        axios
          .post("http://localhost:5000/users", userInfo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err.message));

        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        const userInfo = {
          name: res.user?.displayName,
          email: res.user?.email,
        };

        axios
          .post("http://localhost:5000/users", userInfo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err.message));
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="my-20 ">
      <div className="w-1/4 mx-auto  mt-40 ">
        <form
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-3xl text-center mb-4">Login</h2>
          <input
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200 rounded-md  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder="your email"
            type="email"
            {...register("email")}
          />
          <input
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200 rounded-md  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            type="password"
            placeholder="your password"
            {...register("password")}
          />

          <Button type="submit ">Login</Button>
        </form>
        <p className="mt-2">
          New to account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
        <hr className="my-4" />
        <div className="flex  justify-center">
          <button onClick={handleGoogleLogin}>
            <FcGoogle className="text-5xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
