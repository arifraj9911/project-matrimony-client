import { Textarea } from "flowbite-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logoNav from "../../../assets/Images/logo2.png";

const Footer = () => {

  const handleNewsletter = ()=>{
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Newsletter Subscribe Successfully",
      showConfirmButton: false,
      timer: 1500
    });
  }


  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="md:flex md:-mx-3 md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-gray-800 md:mx-3 xl:text-2xl dark:text-white">
            Subscribe our newsletter to get update.
          </h1>

          <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
            <Link
            onClick={handleNewsletter}
              to=""
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-white duration-300 bg-primary rounded-lg gap-x-3 "
            >
              <span>Sign Up Now</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Quick Link
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Biodatas
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Services
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Personalized Matchmaking
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Profile Verification
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Premium Membership
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Privacy Protection
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Contact Us
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                +880 1637014306
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                arif.raj9911@gmail.com
              </a>
              <div className="flex gap-4 h-8 items-end ">
              <FaFacebook className="text-2xl"/>
              <FaTwitter className="text-2xl"/>
              <FaInstagram className="text-2xl"/>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Queries!!!
            </p>

            <div className="flex flex-col items-start mt-5 space-y-2">
            <Textarea id="comment" placeholder="Leave a comment..." required rows={3} />
            <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto ">
                Send
              </button>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
        <Link className="flex items-center gap-1" to="/">
              <img className="w-auto h-8 sm:h-7" src={logoNav} alt="Logo" />
              <h2 className="text-3xl mr-4 font-bold">
                Love<span className="text-primary">NEST</span>
              </h2>
            </Link>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">
            © Copyright 2024. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
