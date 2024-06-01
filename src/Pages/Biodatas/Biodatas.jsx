import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BiodatasCard from "./BiodatasCard";

const Biodatas = () => {
  const { data: allBio = [] } = useQuery({
    queryKey: ["allBio"],
    queryFn: async () => {
      const res = await axios.get("/all_member.json");
      return res.data;
    },
  });
  return (
    <div className="my-20 max-w-screen-xl mx-auto">
      <div className="flex items-start gap-6">
        {/* filtered option */}
        <div className="border p-6 space-y-8 w-1/4 ">
          <div className="space-y-2">
            <h2 className="text-lg">I am looking for</h2>
            <select className="w-full" name="gender" id="">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg">Age</h2>
            <select className="w-full" name="gender" id="">
              <option value="18-30">18-30</option>
              <option value="31-40">31-40</option>
              <option value="41-50">41-50</option>
            </select>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg">Division</h2>
            <select className="w-full" name="gender" id="">
              <option value="Dhaka">Dhaka</option>
              <option value="Khulna">Khulna</option>
              <option value="Barisal">Barisal</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Chattagram">Chattagram</option>
              <option value="Maymansign">Maymansign</option>
            </select>
          </div>
        </div>

        {/* biodatas  */}
        <div className="flex-1">
          <h2 className="text-2xl">Showing {allBio?.length} Profile</h2>
          <hr className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allBio?.map((member) => (
              <BiodatasCard key={menubar._id} member={member}></BiodatasCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
