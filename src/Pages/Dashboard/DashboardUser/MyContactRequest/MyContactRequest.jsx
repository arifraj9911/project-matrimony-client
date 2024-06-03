import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";

const MyContactRequest = () => {
  const { data: myRequest = [], isPending } = useQuery({
    queryKey: ["myRequest"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/myRequestContact");
      return res.data;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl">My Contact Request </h2>
      <div className="overflow-x-auto my-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Biodata ID</Table.HeadCell>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>Contact Email</Table.HeadCell>
            <Table.HeadCell>Mobile Number</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {myRequest?.map((request) => (
              <Table.Row
                key={request._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{request?.biodata_id}</Table.Cell>
                <Table.Cell>{request?.name}</Table.Cell>
                <Table.Cell>
                  {request?.status === "approved"
                    ? request?.email
                    : "Get after admin approval"}
                </Table.Cell>
                <Table.Cell>
                  {request?.status === "approved"
                    ? request?.phone
                    : "Get after admin approval"}
                </Table.Cell>
                <Table.Cell>
                  {request?.status === "approved" ? "Approved" : "Pending"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MyContactRequest;
