import { Button } from "flowbite-react";
import logoNav from "../../../assets/Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let isAdmin = true;

  const handleLogOut = ()=>{
    // setLoading(true);
    logOut()
    .then(()=>{
        // 
        navigate('/login');
        
    })
    .catch(err=>console.log(err.message))
  }

//   const menuItem = (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/biodatas">Biodatas</NavLink>
//       </li>
//       <li>
//         <NavLink to="/about">About Us</NavLink>
//       </li>
//       <li>
//         <NavLink to="/contact">Contact Us</NavLink>
//       </li>
//     </>
//   );
  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link className="flex items-center gap-1" to="/">
              <img
                className="w-auto h-6 sm:h-7"
                src={logoNav}
                alt="Logo"
              />
              <h2 className="text-3xl">LoveNest</h2>
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <Link
                to='/'
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to='/biodatas'
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Biodatas
              </Link>
              <Link
                to='/about'
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About Us
              </Link>
              <Link
                to='/contact'
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Contact Us
              </Link>
              {
                user && !isAdmin && 
                <Link
                to='/dashboard/userHome'
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </Link>
              }
              {
                user && isAdmin && 
                <Link
                to='/dashboard/adminHome'
                className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </Link>
              }
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              

              <button
                type="button"
                className="flex items-center focus:outline-none"
                aria-label="toggle profile dropdown"
              >
                {
                user ?

                <>
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    className="object-cover w-full h-full"
                    alt="avatar"
                  />
                </div>
                
                    <button  onClick={handleLogOut}>SigOut</button>
                
                </>
            :
            <Link to='/login'><Button>Login</Button>  </Link>  
            }
                <h3 className="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">
                  Khatab wedaa
                </h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
