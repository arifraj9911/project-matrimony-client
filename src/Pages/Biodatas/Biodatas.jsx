import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BiodatasCard from "./BiodatasCard";
import { Button } from "flowbite-react";
import { useState } from "react";

const Biodatas = () => {
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [division, setDivision] = useState(null);

  const { data: allBio = [], isPending } = useQuery({
    queryKey: ["allBio", gender, age, division],
    queryFn: async () => {
      if (gender !== null && age !== null && division !== null) {
        const res = await axios.get(
          `http://localhost:5000/allMembers?gender=${gender}&age=${age}&division=${division}`
        );
        return res.data;
      } else {
        const res = await axios.get(`http://localhost:5000/initialAllMembers`);
        return res.data;
      }
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  const handleSearchProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    setGender(form.gender.value);
    setAge(form.age.value);
    setDivision(form.division.value);
  };
  return (
    <div className="my-20 max-w-screen-xl mx-auto">
      <div className="flex items-start gap-6">
        {/* filtered option */}
        <form
          onSubmit={handleSearchProfile}
          className="border p-6 space-y-8 w-1/4 "
        >
          <div className="space-y-2">
            <h2 className="text-lg">I am looking for</h2>
            <select
              defaultValue={gender}
              className="w-full"
              name="gender"
              id=""
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg">Age</h2>
            <select defaultValue={age} className="w-full" name="age" id="">
              <option value="18-30">18-30</option>
              <option value="31-40">31-40</option>
              <option value="41-50">41-50</option>
            </select>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg">Division</h2>
            <select
              defaultValue={division}
              className="w-full"
              name="division"
              id=""
            >
              <option value="Dhaka">Dhaka</option>
              <option value="Khulna">Khulna</option>
              <option value="Barisal">Barisal</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Chattagram">Chattagram</option>
              <option value="Maymansign">Maymansign</option>
            </select>
          </div>
          <div>
            <Button type="submit">Search Profile</Button>
          </div>
        </form>

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
