import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(data)

    createUser(email, password)
      .then((res) => {
        console.log(res.user);

        updateUserProfile(data.name, data.photo)
          .then(() => {
            console.log("user updated");
          })
          .catch((err) => console.log(err.message));

        reset();
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="py-20 bg-gray-50">
      <h2 className="text-2xl text-center mb-8 font-semibold ">Create new account</h2>
      <div className="flex flex-col w-1/3 mx-auto shadow rounded-md bg-white p-10">
        <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          <input
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200   dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder="your name"
            type="text"
            {...register("name")}
          />
          <input
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200   dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder="your email"
            type="email"
            {...register("email")}
          />
          <input
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200  dark:bg-gray-900 dark:text-gray-300  focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            placeholder="your password"
            type="password"
            {...register("password")}
          />
          <input
            className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            type="text"
            placeholder="your photo url"
            {...register("photo")}
          />
          <button
            type="submit"
            className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform rounded-md bg-primary  lg:w-full "
          >
            Register
          </button>
          {/* <Button type="submit ">Register</Button> */}
        </form>
        <p className="mt-2"> 
          Already have an account? <Link className="text-blue-500" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
