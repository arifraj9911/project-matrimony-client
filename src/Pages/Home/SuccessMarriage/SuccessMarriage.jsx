import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { FaUsers, FaMale, FaFemale, FaHeart } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";

const SuccessMarriage = () => {
  const { data: successCounter = 0, isPending } = useQuery({
    queryKey: ["successCounter"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/successCounter");
      console.log(res.data);
      return res.data;
    },
  });

  const { data: getMarried = [], isPending: successPending } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/successStory");
      return res.data;
    },
  });

  if (isPending || successPending) {
    return <PacmanLoader color="#36d7b7" />;
  }

  return (

    <div className="bg-gray-50 px-8 py-20 rounded-lg ">
      <h2 className="text-4xl font-bold text-center mb-10">Our Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaUsers className="text-4xl mx-auto text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold">Total Biodata</h3>
          <p className="text-2xl">{successCounter?.totalBiodata}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaMale className="text-4xl mx-auto text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold">Male Biodata</h3>
          <p className="text-2xl">{successCounter?.maleBiodata}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaFemale className="text-4xl mx-auto text-pink-500 mb-4" />
          <h3 className="text-xl font-semibold">Female Biodata</h3>
          <p className="text-2xl">{successCounter?.femaleBiodata}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaHeart className="text-4xl mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold">Coupled Pairs</h3>
          <p className="text-2xl">{getMarried?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMarriage;
