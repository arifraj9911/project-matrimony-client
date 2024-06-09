import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GetMarriageCard from "./GetMarriageCard";

const GetMarriage = () => {
  const { data: successMarriageStory = [], isPending } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/successStory");
      return res.data;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div className="my-20 max-w-screen-xl mx-auto">
      <h2 className="text-2xl mb-10 text-center">Success Marriage Story</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {successMarriageStory?.map((story) => (
          <GetMarriageCard key={story._id} story={story}></GetMarriageCard>
        ))}
      </div>
    </div>
  );
};

export default GetMarriage;
