import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Table } from "flowbite-react";
import toast from "react-hot-toast";
import { PacmanLoader } from "react-spinners";

const ApprovedPremium = () => {
  const { data: premiumRequest, isPending,refetch } = useQuery({
    queryKey: ["premiumRequest"],
    queryFn: async () => {
      const res = await axios.get("https://project-matrimony-server.vercel.app/premium",{
        headers:{
          authorization:`Bearer ${localStorage.getItem('access_token')}`
        }
      });
      console.log(res.data[0]);
      return res.data;
    },
  });

  const handlePremium = (id)=>{
    axios.put(`https://project-matrimony-server.vercel.app/premium/${id}`)
    .then(res=>{
        console.log(res.data);
        refetch();
    })
    .catch(err=>toast.error(err.message))
  }

  if (isPending) {
    return <PacmanLoader color="#36d7b7" />;
  }
  return (
    <div>
      <h2 className="text-2xl">Approved Premium</h2>
      <div className="overflow-x-auto my-8">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Biodata ID</Table.HeadCell>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>User Email</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {premiumRequest?.map((request) => (
              <Table.Row
                key={request._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{request.biodata_id}</Table.Cell>
                <Table.Cell>{request.name}</Table.Cell>
                <Table.Cell>{request.email}</Table.Cell>
                <Table.Cell>
                    {
                        request?.status === 'premium' ? 'Premium Member' : <Button className="bg-primary" onClick={()=>handlePremium(request.biodata_id)}>Premium Request</Button>
                    }
                  
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ApprovedPremium;
