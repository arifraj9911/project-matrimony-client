import { Avatar, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const RelatedProfileCard = ({ member }) => {
  const {
    biodata_id,
    biodata_type,
    profile_image,
    permanent_division_name,
    age,
    occupation,
  } = member;
  return (
    <Card className="max-w-sm ">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-start pb-10">
        <div className="flex gap-6 mb-4">
          <Avatar
            className="mb-2"
            img={profile_image}
            size="lg"
            status="online"
          />
          <div>
            <p>ID: {biodata_id}</p>
            <h5 className="my-2 text-xl font-medium text-gray-900 dark:text-white">
              Gender: {biodata_type}
            </h5>
          </div>
        </div>

        <div className="flex border-t pt-4 gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Age: {age}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Occupation: {occupation}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Division: {permanent_division_name}
          </span>
        </div>

        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Link
            to={`/profileDetails/${biodata_id}`}
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            View Profile
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default RelatedProfileCard;
