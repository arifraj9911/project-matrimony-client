import {
  
  Datepicker,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
// import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";

// image upload api
const imageHostingKey = "3951e23defb40e6373eb171e3b8e6b24";
// const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  //   const { count } = useLoaderData();
  const [selectedFile, setSelectedFile] = useState(null);
  // const [imageUrl,setImageUrl] = useState('');

  const {
    data: count = 0,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const res = await axios.get("https://project-matrimony-server.vercel.app/membersCount",{
        headers:{
          authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return res.data;
    },
  });

  console.log(count.count);

  let lastId = count.count;

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleEditProfile = (e) => {
    // setLastId(lastId+1)
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const biodata_type = form.gender.value;
    const age = parseInt(form.age.value);
    const date_of_birth = form.date.value;
    const occupation = form.occupation.value;
    const height = form.height.value;
    const weight = form.weight.value;
    const father_name = form.father_name.value;
    const mother_name = form.mother_name.value;
    const permanent_division_name = form.permanent_division.value;
    const present_division_name = form.present_division.value;
    const race = form.race.value;
    const createdTime = {
      time: new Date().toTimeString(),
    };
    const expected_gender = form.expected_gender.value;
    const expected_age = form.expected_age.value;
    const expected_height = form.expected_height.value;
    const expected_weight = form.expected_weight.value;
    const biodata_id = lastId + 1;
    // const profile_image = form.image.value;

    const formData = new FormData();

    formData.append("image", selectedFile);

    axios
      .post("https://api.imgbb.com/1/upload", formData, {
        params: {
          key: imageHostingKey,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // setImageUrl(res.data.data.url)

        const profileBiodata = {
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
          createdTime,
          biodata_id,
          profile_image: res.data.data.url,
          expected_age,
          expected_gender,
          expected_height,
          expected_weight,
        };

        // console.log(profileBiodata);

        axios
          .post("https://project-matrimony-server.vercel.app/members", profileBiodata,{
            headers:{
              authorization:`Bearer ${localStorage.getItem('access_token')}`
            }
          })
          .then((res) => {
            toast.success("profile added");
            if (res.data.insertedId) {
              toast.success("profile added successfully");
              refetch();
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: `${res.data.message}`,
              });
            }
          })
          .catch((err) => toast.error(err.message));
      });


  };

  if (isPending) {
    return <PacmanLoader color="#36d7b7" />;
  }

  return (
    <div className="w-5/6 shadow p-10">
      <form onSubmit={handleEditProfile}>
        {/* Basic profile information */}
        <div>
          <h2 className="text-2xl">Edit My Profile</h2>
          <hr className="my-4" />
          <div className="space-y-4">
            <div>
              <div className="mb-2 block">
                <Label value="Name" />
              </div>
              <TextInput name="name" type="text" sizing="md" />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Contact Email" />
              </div>
              <TextInput
                name="email"
                value={user?.email}
                readOnly
                type="email"
                sizing="md"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Phone Number" />
              </div>
              <TextInput name="phone" type="number" sizing="md" />
            </div>
          </div>
        </div>
        <hr className="my-10 h-[6px] bg-black" />

        {/* others information */}
        <div>
          <h2 className="text-2xl">Others Information</h2>
          <hr className="my-4" />
          <div className="space-y-4">
            <div className="flex gap-6">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Biodata Type" />
                </div>
                <Select name="gender" required>
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </div>
              <div className="w-full">
                <div className="mb-2 block ">
                  <Label value="Age" />
                </div>
                <TextInput name="age" type="number" />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Date of Birth" />
                </div>
                <Datepicker name="date" />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Occupation" />
                </div>
                <Select name="occupation" required>
                  <option>Job</option>
                  <option>Student</option>
                  <option>Unemployed</option>
                  <option>Housewife</option>
                  <option>Divorced</option>
                </Select>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Height(inch)" />
                </div>
                <TextInput name="height" type="float" />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Weight(kg)" />
                </div>
                <TextInput name="weight" type="number" />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Father Name" />
                </div>
                <TextInput name="father_name" type="text" />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Mother Name" />
                </div>
                <TextInput name="mother_name" type="text" />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Permanent Division" />
                </div>
                <Select name="permanent_division" required>
                  <option>Dhaka</option>
                  <option>Khulna</option>
                  <option>Chattagram</option>
                  <option>Rangpur</option>
                  <option>Barisal</option>
                  <option>Mymansign</option>
                  <option>Sylhet</option>
                </Select>
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Present Division" />
                </div>
                <Select name="present_division" required>
                  <option>Dhaka</option>
                  <option>Khulna</option>
                  <option>Chattagram</option>
                  <option>Rangpur</option>
                  <option>Barisal</option>
                  <option>Mymansign</option>
                  <option>Sylhet</option>
                </Select>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Race" />
                </div>
                <Select name="race" required>
                  <option>Bangladeshi</option>
                  <option>Indian</option>
                  <option>American</option>
                  <option>German</option>
                  <option>Italian</option>
                  <option>Brazilian</option>
                </Select>
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Upload Yor Photo" />
                </div>
                <FileInput
                  onChange={handleFileSelect}
                  name="image"
                  type="file"
                  id="file-upload-helper-text"
                  helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10 h-[6px] bg-black" />

        {/* partner expectation */}
        <div>
          <h2 className="text-2xl">Partner Expectations</h2>
          <hr className="my-4" />
          <div className="space-y-4">
            <div className="flex gap-6">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Gender" />
                </div>
                <Select name="expected_gender" required>
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Age" />
                </div>
                <Select name="expected_age" required>
                  <option>18-30</option>
                  <option>31-40</option>
                  <option>41-56</option>
                </Select>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Height(inch)" />
                </div>
                <Select name="expected_height" required>
                  <option>4.4-5.2 </option>
                  <option>5.3-5.10</option>
                  <option>5.4-6.4</option>
                </Select>
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label value="Weight(kg)" />
                </div>
                <Select name="expected_weight" required>
                  <option>35-50</option>
                  <option>51-65</option>
                  <option>66-80</option>
                  <option>81-100</option>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10 h-[6px] bg-black" />

        <div>
        <button type="submit" className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto ">
        Save and Publish
              </button>
          
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;
