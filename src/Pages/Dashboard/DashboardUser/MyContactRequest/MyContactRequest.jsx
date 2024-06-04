import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import { IoRemoveCircleSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const MyContactRequest = () => {
  const {
    data: myRequest = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myRequest"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/myRequestContact",{
        headers:{
          authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return res.data;
    },
  });

  const handleDeleteRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/myRequestContact/${id}`,{
            headers:{
              authorization:`Bearer ${localStorage.getItem('access_token')}`
            }
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

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
            <Table.HeadCell>Action</Table.HeadCell>
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
                <Table.Cell>
                  <button
                    onClick={() => handleDeleteRequest(request.biodata_id)}
                  >
                    <IoRemoveCircleSharp className="text-3xl text-red-500" />
                  </button>
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
