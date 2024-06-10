// import { Avatar, Card } from "flowbite-react";
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
    <div className="bg-gray-50 p-8 text-center mt-16">
      <div className="relative flex justify-center -mt-20">
        <img
          className="object-cover w-20 h-20 rounded-full"
          src={profile_image}
          alt=""
        />
        <span className="absolute bottom-0 w-3 h-3 rounded-full bg-emerald-500 right-1 ring-1 ring-white"></span>
      </div>
      <div>
        <h2 className="text-xl  mt-6">Bio ID: {biodata_id}</h2>
        <hr className="my-4" />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Age: {age}</span>
            <span>Occupation: {occupation}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between">
            <span>Gender: {biodata_type}</span>
            <span>Division: {permanent_division_name}</span>
          </div>
        </div>
        <hr className="my-3" />
        <Link to={`/profileDetails/${biodata_id}`}>
          <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto ">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProfileCard;
