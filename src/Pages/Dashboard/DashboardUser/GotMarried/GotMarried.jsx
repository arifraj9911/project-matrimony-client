import axios from "axios";
import {  FileInput, Label, TextInput, Textarea } from "flowbite-react";

import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const imageHostingKey = "3951e23defb40e6373eb171e3b8e6b24";
const GotMarried = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSuccessStory = (e) => {
    e.preventDefault();

    const form = e.target;
    const selfBioId = form.selfId.value;
    const partnerBioId = form.partnerId.value;
    const sharedFeelings = form.feelings.value;

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
        const marriedInfo = {
          selfBioId,
          partnerBioId,
          coupleImage: res.data.data.url,
          sharedFeelings,
        };

        axios
          .post("https://project-matrimony-server.vercel.app/gotMarried", marriedInfo, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((res) => {
            // console.log("added got married data", res.data);
            if (res.data.insertedId) {
              toast.success("success story added successfully");
            } else {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: `${res.data.message}`,
              });
            }
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div>
      <h2 className="text-2xl uppercase">Share my success story.</h2>
      <form
        onSubmit={handleSuccessStory}
        className="mt-10 w-4/5 mx-auto space-y-6"
      >
        <div className="flex gap-6">
          <div className=" w-full">
            <div className="mb-2 block">
              <Label value="Self Biodata Id" />
            </div>
            <TextInput
              className="w-full"
              type="number"
              name="selfId"
              placeholder="self biodata id"
              id=""
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block ">
              <Label value="Partner Biodata Id" />
            </div>
            <TextInput
              className="w-full"
              type="number"
              name="partnerId"
              placeholder="self biodata id"
              id=""
            />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Couple Image" />
          </div>
          <FileInput onChange={handleFileSelect} type="file" name="image" />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Share your feelings" />
          </div>
          <Textarea
            name="feelings"
            placeholder="your message..."
            required
            rows={6}
          />
        </div>
        <div>
        <button type="submit" className="w-full px-5 py-2  text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto ">
                Submit
              </button>
        </div>
      </form>
    </div>
  );
};

export default GotMarried;
