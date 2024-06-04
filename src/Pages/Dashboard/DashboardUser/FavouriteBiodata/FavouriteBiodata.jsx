import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import { IoRemoveCircleSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const FavouriteBiodata = () => {
  const {
    data: favoriteMember = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["favoriteMember"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/favoriteBiodata",{
        headers:{
          authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return res.data;
    },
  });

  const handleDeleteBiodata = (id) => {
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
          .delete(`http://localhost:5000/favoriteBiodata/${id}`,{
            headers:{
              authorization:`Bearer ${localStorage.getItem('access_token')}`
            }
          })
          .then((res) => {
            // console.log(res.data);
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
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
      <h2 className="text-2xl">
        My Favorite Biodatas: {favoriteMember?.length}
      </h2>
      <div className="overflow-x-auto my-12">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Biodata ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Permanent Address</Table.HeadCell>
            <Table.HeadCell>Occupation</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {favoriteMember?.map((member) => (
              <Table.Row
                key={member.biodata_id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{member.biodata_id}</Table.Cell>
                <Table.Cell>{member.name}</Table.Cell>
                <Table.Cell>{member.permanent_division_name}</Table.Cell>
                <Table.Cell>{member.occupation}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleDeleteBiodata(member.biodata_id)}
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

export default FavouriteBiodata;
