import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import toast from "react-hot-toast";
import { PacmanLoader } from "react-spinners";

const ApprovedContactRequest = () => {
  const {
    data: approvedContact = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["approvedContact"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/approveRequestContact", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return res.data;
    },
  });

  const handleApprovedRequest = (id) => {
    axios
      .put(`http://localhost:5000/myRequestContact/contactApproval/${id}`)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((err) =>toast.error(err.message));
  };

  if (isPending) {
    return <PacmanLoader color="#36d7b7" />;
  }
  return (
    <div>
      <h2 className="text-2xl">Approved Contact Request </h2>
      <div className="overflow-x-auto my-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Biodata ID</Table.HeadCell>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>Contact Email</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {approvedContact?.map((request) => (
              <Table.Row
                key={request._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{request?.biodata_id}</Table.Cell>
                <Table.Cell>{request?.name}</Table.Cell>
                <Table.Cell>{request?.email}</Table.Cell>
                <Table.Cell>
                  {request?.status === "approved" ? (
                    "Approved"
                  ) : (
                    <Button className="bg-primary"
                      onClick={() => handleApprovedRequest(request.biodata_id)}
                    >
                      Request Contact
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ApprovedContactRequest;
