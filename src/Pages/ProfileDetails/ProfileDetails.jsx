import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import {
  PiBuildingApartmentLight,
  PiGenderIntersexLight,
} from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import RelatedProfileCard from "./RelatedProfileCard";
import { AuthContext } from "../../provider/AuthProvider";
import { PacmanLoader } from "react-spinners";

const ProfileDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [gender, setGender] = useState(null);
  const { data: member = [], isPending } = useQuery({
    queryKey: ["member", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/members/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setGender(res.data.biodata_type);
      return res.data;
    },
  });

  const { data: similarMember = [], isPending: pendingSimilarMember } =
    useQuery({
      queryKey: ["similarMember", gender],
      queryFn: async () => {
        const res = await axios.get(
          `http://localhost:5000/similarMembers?gender=${gender}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        return res.data;
      },
    });

  const { data: usersData = [], isPending: userPending } = useQuery({
    queryKey: ["usersData", user?.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(res.data);
      return res.data;
    },
  });

  if (isPending || pendingSimilarMember || userPending) {
    return <PacmanLoader color="#36d7b7" />;
  }

  // console.log(usersData)

  const handleAddFavorite = (member) => {
    axios
      .post("http://localhost:5000/favoriteBiodata", member, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          alert("Biodata added in the favorite list");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const {
    biodata_id,
    biodata_type,
    profile_image,
    permanent_division_name,
    age,
    occupation,
    father_name,
    mother_name,
    present_division_name,
    race,
    height,
    weight,
    date_of_birth,
    name,
  } = member;

  // console.log(similarMember);
  return (
    <div className=" max-w-screen-xl mx-auto my-20">
      <div className="flex gap-6">
        <div className="w-1/2">
          <img
            className="w-full h-[600px] rounded-lg"
            src={profile_image}
            alt=""
          />
        </div>
        <div className="w-1/2 ">
          <h4 className="text-sm font-normal mb-1">Bio ID: {biodata_id}</h4>
          <h2 className="text-3xl font-semibold">{name}</h2>
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
          <hr className="my-6" />
          <div>
            <div className="flex flex-col gap-2">
              <span>Height: {height}</span>
              <span>Weight: {weight}</span>
              <span>Date Of Birth: {date_of_birth}</span>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-2">
              <span>Fathers Name: {father_name}</span>
              <span>Mothers Name: {mother_name}</span>
              <span>Present Division: {present_division_name}</span>
              <span>Race: {race}</span>
            </div>
          </div>
          <hr className="my-4" />
          <div>
            {usersData?.status === "premium" && (
              <p className="flex flex-col font-semibold gap-3">
                <span>
                  Contact Email:{" "}
                  {member?.email ? member.email : "no email found"}
                </span>
                <span>
                  Mobile Number:{" "}
                  {member?.phone ? member.phone : "no phone found"}
                </span>
              </p>
            )}
          </div>
          <div className="flex gap-6 mt-3">
            {usersData?.role !== "admin" && (
              <Link to="">
                <button
                  onClick={() => handleAddFavorite(member)}
                  className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto "
                >
                  Add to Favorite
                </button>
              </Link>
            )}

            {usersData?.status !== "premium" && (
              <Link to={`/checkout/${biodata_id}`}>
                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto ">
                  Request Contact Information
                </button>
              </Link>
            )}
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
