import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Members_Card from "./Members_Card";
import { Dropdown } from "flowbite-react";
import { useState } from "react";

const Premium_Members = () => {
  const [asc, setAsc] = useState(true);
  const { data: members = [] } = useQuery({
    queryKey: ["members", asc],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/members?sort=${asc ? "asc" : "desc"}`
      );
      return res.data;
    },
  });

  // const handleSort = (target) => {
  //   if (target === 1) {
  //     setSortAge("Ascending");
  //   }
  //   if (target === 2) {
  //     setSortAge("Descending");
  //   }
  // };
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
          <Dropdown
            label={asc ? "Ascending" : "Descending"}
            dismissOnClick={false}
          >
            <Dropdown.Item onClick={() => setAsc(true)}>
              Ascending 
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setAsc(false)}>
              Descending
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.slice(0, 6)?.map((member) => (
          <Members_Card key={member.biodata_id} member={member}></Members_Card>
        ))}
      </div>
    </div>
  );
};

export default Premium_Members;
