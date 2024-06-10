import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import SuccessModal from "./SuccessModal";
import { PacmanLoader } from "react-spinners";

const SuccessStory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [specificStory, setSpecificStory] = useState({});
  const { data: successStory = [], isPending } = useQuery({
    queryKey: ["successStory"],
    queryFn: async () => {
      const res = await axios.get("https://project-matrimony-server.vercel.app/successStory");
      return res.data;
    },
  });

  const handleSuccessModal = (id) => {
    // console.log(id);

    fetch(`https://project-matrimony-server.vercel.app/successStory/${id}`)
      .then((res) => res.json())
      .then((data) => setSpecificStory(data));
  };

  if (isPending) {
    return <PacmanLoader color="#36d7b7" />;
  }
  return (
    <div>
      <h2 className="text-2xl">All Success Story</h2>
      <div className="overflow-x-auto mt-10">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Female Biodata ID</Table.HeadCell>
            <Table.HeadCell>Male Biodata ID</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {successStory?.map((success) => (
              <Table.Row
                key={success._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{success?.partnerBioId}</Table.Cell>
                <Table.Cell>{success?.selfBioId}</Table.Cell>
                <Table.Cell>
                  <Button
                    className="bg-primary"
                    onClick={() => {
                      setOpenModal(true);
                      handleSuccessModal(success._id);
                    }}
                  >
                    View Story
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <SuccessModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        specificStory={specificStory}
      ></SuccessModal>
    </div>
  );
};

export default SuccessStory;
