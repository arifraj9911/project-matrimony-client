import { Button } from "flowbite-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser,updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(data)

    createUser(email, password)
      .then((res) => {
        console.log(res.user);

        updateUserProfile(data.name,data.photo)
        .then(()=>{
          console.log('user updated');
        })
        .catch(err=>console.log(err.message))

        reset();
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="my-20">
      <form
        className="flex flex-col w-1/4 mx-auto  mt-40 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl text-center mb-4">Register</h2>
        <input
          className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200 rounded-md  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          placeholder="your name"
          type="text"
          {...register("name")}
        />
        <input
          className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200 rounded-md  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          placeholder="your email"
          type="email"
          {...register("email")}
        />
        <input
          className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200 rounded-md  dark:bg-gray-900 dark:text-gray-300  focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          placeholder="your password"
          type="password"
          {...register("password")}
        />
        <input
          className="px-4 py-2 w-full text-gray-700 bg-white border border-gray-200 rounded-md  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          type="text"
          placeholder="your photo url"
          {...register("photo")}
        />

        <Button type="submit ">Register</Button>
      </form>
    </div>
  );
};

export default Register;
