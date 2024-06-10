import bannerImg from "../../../assets/Images/banner1.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="container px-6  mx-auto">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white lg:text-5xl">
              <p> Every Heart Finds Its </p>
              <p className="mt-3">
                Perfect <span className="text-primary">Soul</span>{" "}
              </p>
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Discover your soulmate at Love NEST. Connect with genuine,
              like-minded individuals and embark on your journey to a lifetime
              of love and happiness.
            </p>

            <Link to="/biodatas">
              <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto ">
                Find Now
              </button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <img
            className="w-full h-full lg:max-w-3xl"
            src={bannerImg}
            alt="Catalogue-pana.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
