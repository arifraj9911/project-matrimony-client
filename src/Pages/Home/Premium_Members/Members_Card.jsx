import { Link } from "react-router-dom";

const Members_Card = ({ member }) => {
  const {
    biodata_id,
    biodata_type,
    profile_image,
    permanent_division_name,
    age,
    occupation,
  } = member;
  return (
    <div className=" bg-white border mt-10 border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-2 w-full">
        <img className=" h-[300px] w-full" src={profile_image} alt="" />
      </div>
      <div className="p-5 text-left">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bio ID: {biodata_id}
          </h5>
          <hr className="my-2" />
        </a>
        <div className="flex justify-between items-center mt-4">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Gender: {biodata_type}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Age: {age}
          </p>
        </div>
        <hr className="mb-2" />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Occupation: {occupation}
        </p>
        <hr className="my-2" />

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Permanent Division: {permanent_division_name}
        </p>
        <hr className="mt-2 mb-6" />
        <Link
          to={`/profileDetails/${biodata_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg"
        >
          View Profile
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Members_Card;
