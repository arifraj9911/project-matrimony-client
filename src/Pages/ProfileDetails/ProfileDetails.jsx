import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "flowbite-react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import {
  PiBuildingApartmentLight,
  PiGenderIntersexLight,
} from "react-icons/pi";
import { useParams } from "react-router-dom";
import RelatedProfileCard from "./RelatedProfileCard";

const ProfileDetails = () => {
  const { id } = useParams();
  const [gender, setGender] = useState(null);
  const { data: member = [], isPending } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/members/${id}`);
      setGender(res.data[0].biodata_type);
      return res.data;
    },
  });

  const { data: similarMember = [], isPending: pendingSimilarMember } =
    useQuery({
      queryKey: ["similarMember", gender],
      queryFn: async () => {
        const res = await axios.get(
          `http://localhost:5000/similarMembers?gender=${gender}`
        );
        return res.data;
      },
    });

  if (isPending || pendingSimilarMember) {
    return <p>Loading...</p>;
  }

  const {
    biodata_id,
    biodata_type,
    profile_image,
    permanent_division_name,
    age,
    occupation,
  } = member[0];

  console.log(similarMember);
  return (
    <div className=" max-w-screen-xl mx-auto my-20">
      <div className="flex gap-6">
        <div className="w-1/2">
          <img src={profile_image} alt="" />
        </div>
        <div className="w-1/2 ">
          <h2 className="text-3xl">Bio ID: {biodata_id}</h2>
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col shadow p-3 items-center gap-2 ">
              <FaUser className="text-xl"></FaUser>
              Age: {age}
            </div>
            <div className="flex flex-col shadow p-3 items-center gap-2 ">
              <PiGenderIntersexLight className="text-xl" />
              Gender: {biodata_type}
            </div>
            <div className="flex flex-col shadow p-3 items-center gap-2 ">
              <IoLocationOutline className="text-xl" />
              Location: {permanent_division_name}
            </div>

            <div className="flex flex-col shadow p-3 items-center gap-2 ">
              <PiBuildingApartmentLight className="text-xl" />
              Occupation: {occupation}
            </div>
          </div>
          <hr className="my-8" />
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            dolore nihil rerum. Explicabo, laudantium modi obcaecati nisi
            repudiandae perferendis in saepe maiores. Nulla id quis magnam earum
            ipsam saepe pariatur, tempore numquam nesciunt dignissimos
            consequatur voluptatibus excepturi nisi nam quaerat exercitationem
            sint ut voluptatum fugiat quibusdam! Iure est deserunt adipisci!
          </p>
          <div className="flex gap-6 mt-10">
            <Button>Add To Favorite</Button>
            <Button>Request Contact Information</Button>
          </div>
        </div>
      </div>
      <div className="my-32">
        <h2 className="text-3xl mb-8">Related Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarMember.slice(0, 3)?.map((member) => (
            <RelatedProfileCard
              key={member.biodata_id}
              member={member}
            ></RelatedProfileCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
