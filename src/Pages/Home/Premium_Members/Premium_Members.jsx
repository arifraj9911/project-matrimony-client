import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Members_Card from "./Members_Card";
import { Dropdown } from "flowbite-react";

const Premium_Members = () => {
  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axios.get("member.json");
      return res.data;
    },
  });
  return (
    <div className="my-20 max-w-screen-xl mx-auto text-center">
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-3xl "> Our Premium Members</h2>
          <p className="w-1/2 mx-auto mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
            expedita mod{" "}
          </p>
        </div>
        <div>
          <Dropdown label="Dropdown button" dismissOnClick={false}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members?.map((member) => (
          <Members_Card key={member.biodata_id} member={member}></Members_Card>
        ))}
      </div>
    </div>
  );
};

export default Premium_Members;
