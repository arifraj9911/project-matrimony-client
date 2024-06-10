import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const searchRef = useRef(null);
  const [allUsers, setAllUsers] = useState([]);
  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users",{
        headers:{
          authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return res.data;
    },
  });

  useEffect(() => {
    // const searchText = searchRef.current.value;
    setAllUsers(users);
  }, [users]);

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/users/admin/${user._id}`)
          .then((res) => {
            // console.log(res.data);
            refetch();
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: `${user.name} is now admin`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleMakePremium = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Premium",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:5000/users/premium/${user._id}`)
          .then((res) => {
            refetch();
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: `${user.name} is now premium user`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleSearchUser = () => {
    const searchText = searchRef.current.value;
    axios
      .get(`http://localhost:5000/userSearch?search=${searchText}`)
      .then((res) => {
        // console.log(res.data);
        setAllUsers(res.data);
      });
  };

  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Manage Users</h2>
        <div className="flex">
          <input
            ref={searchRef}
            type="text"
            className="py-2 px-3 border border-gray-200 rounded-lg rounded-r-none"
            placeholder="username..."
          />
          
          <Button
            onClick={handleSearchUser}
            size="sm"
            className="rounded-l-none bg-primary"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto my-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>User Email</Table.HeadCell>
            <Table.HeadCell>Authorization</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allUsers?.map((user) => (
              <Table.Row
                key={user._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  {user?.role === "admin" ? (
                    "Admin"
                  ) : (
                    <Button className="bg-primary" onClick={() => handleMakeAdmin(user)}>
                      Make Admin
                    </Button>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {user?.status === "premium" ? (
                    "Premium"
                  ) : (
                    <Button className="bg-primary" onClick={() => handleMakePremium(user)}>
                      Make Premium
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

export default ManageUsers;
