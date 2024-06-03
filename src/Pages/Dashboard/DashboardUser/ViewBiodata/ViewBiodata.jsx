import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Avatar, Button } from "flowbite-react";
import { useContext, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/AuthProvider";

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);

  const {
    data: viewMembers = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["viewMembers", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/initialAllMembers/${user.email}`
      );
      // console.log(res.data[0]);
      return res.data;
    },
  });

  useEffect(() => {}, []);

  // console.log(viewMembers[0]);sa

  if (isPending) {
    return <p>Loading...</p>;
  }

  const {
    name,
    email,
    phone,
    biodata_type,
    age,
    date_of_birth,
    occupation,
    height,
    weight,
    father_name,
    mother_name,
    permanent_division_name,
    present_division_name,
    race,
    biodata_id,
    profile_image,
    expected_age,
    expected_gender,
    expected_height,
    expected_weight,
  } = viewMembers[0];

  // console.log(biodata_id)

  const handleMakePremium = (id) => {
    // console.log(requestPremium,id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then((result) => {
      if (result.isConfirmed) {
        // make premium update
        axios
          .patch(`http://localhost:5000/initialAllMembers/premium/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Successfully Update!",
                text: `${name} is now premium member`,
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err.message));

        // premium request send pending premium collection
        // axios.post()
      }
    });
  };

  return (
    <div className="w-5/6">
      <div>
        <h2 className="text-2xl">My Profile</h2>
        <hr className="my-4" />
        <div className="flex justify-between mt-12 items-center">
          <div className="flex gap-4 items-center ">
            <Avatar
              img={profile_image}
              alt="avatar of Jese"
              rounded
              size="lg"
            />
            <span>
              <h2 className="text-2xl mb-1 font-bold">{name}</h2>
              <p className="text-[16px] font-normal">
                Biodata ID: {biodata_id}
              </p>
            </span>
          </div>
          <div>
            {viewMembers[0]?.status === "pending" ? (
              "Pending"
            ) : viewMembers[0]?.status === "premium" ? (
              "Premium Member"
            ) : (
              <Button onClick={() => handleMakePremium(biodata_id)}>
                Make Premium Request
              </Button>
            )}
          </div>
        </div>
        <div className="mt-12">
          <div className="flex justify-between">
            <h2 className="text-2xl">Personal Information</h2>
            <button className="flex items-center gap-1  text-lg  ">
              <CiEdit />
              Edit
            </button>
          </div>
          <hr className="my-6" />
          <div className=" space-y-4 ">
            <p className="flex justify-between ">
              <span>Full Name : </span>
              <span>{name}</span>
            </p>
            <p className="flex justify-between ">
              <span>Age : </span>
              <span>{age}</span>
            </p>
            <p className="flex justify-between">
              <span>Byodata Type: </span>
              <span>{biodata_type}</span>
            </p>
            <p className="flex justify-between">
              <span>Height: </span>
              <span>{height} Inches</span>
            </p>
            <p className="flex justify-between">
              <span>Weight: </span>
              <span>{weight} kg</span>
            </p>
            <p className="flex justify-between">
              <span>Date Of Birth : </span>
              <span>{date_of_birth}</span>
            </p>
            <p className="flex justify-between">
              <span>Contact Email : </span>
              <span>{email}</span>
            </p>
            <p className="flex justify-between">
              <span>Mobile Number : </span>
              <span>{phone}</span>
            </p>
          </div>

          <h2 className="text-2xl mt-12">Others Information</h2>
          <hr className="my-6" />
          <div className="  space-y-4 ">
            <p className="flex justify-between ">
              <span>Fathers Name : </span>
              <span>{father_name}</span>
            </p>
            <p className="flex justify-between ">
              <span>Mothers Name : </span>
              <span>{mother_name}</span>
            </p>
            <p className="flex justify-between">
              <span>Permanent Division: </span>
              <span>{permanent_division_name}</span>
            </p>
            <p className="flex justify-between">
              <span>Present Division: </span>
              <span>{present_division_name}</span>
            </p>
            <p className="flex justify-between">
              <span>Occupation: </span>
              <span>{occupation}</span>
            </p>
            <p className="flex justify-between">
              <span>Race : </span>
              <span>{race}</span>
            </p>
          </div>
          <h2 className="text-2xl mt-12">Interest</h2>
          <hr className="my-6" />
          <div className="  space-y-4 ">
            <p className="flex justify-between ">
              <span>Expected Person Biodata Type: </span>
              <span>{expected_gender}</span>
            </p>
            <p className="flex justify-between ">
              <span>Expected Person Age: </span>
              <span>{expected_age}</span>
            </p>
            <p className="flex justify-between">
              <span>Expected Person Height: </span>
              <span>{expected_height}(Inches)</span>
            </p>
            <p className="flex justify-between">
              <span>Expected Person Weight: </span>
              <span>{expected_weight}(kg)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBiodata;
