import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GetMarriageCard from "./GetMarriageCard";
import { PacmanLoader } from "react-spinners";

const GetMarriage = () => {
  const { data: successMarriageStory = [], isPending } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/successStory");
      return res.data;
    },
  });

  if (isPending) {
    return <PacmanLoader color="#36d7b7" />;
  }
  return (
    <div className="my-20 max-w-screen-xl mx-auto">
      <div className="mb-16">
      <h2 className="text-4xl mb-2 text-center font-bold">Success Marriage Story</h2>
      <p className="w-1/2 mx-auto text-center">Join the ranks of our successful married couples who found love and happiness through our platform, forging lasting bonds and beautiful marriages</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {successMarriageStory?.map((story) => (
          <GetMarriageCard key={story._id} story={story}></GetMarriageCard>
        ))}
      </div>
    </div>
  );
};

export default GetMarriage;
