import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Members_Card from "./Members_Card";
import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

const Premium_Members = () => {
  const [asc, setAsc] = useState(true);
  const { data: members = [],isPending } = useQuery({
    queryKey: ["members", asc],
    queryFn: async () => {
      const res = await axios.get(
        `https://project-matrimony-server.vercel.app/members?sort=${asc ? "asc" : "desc"}`
      );
      return res.data;
    },
  });

  if(isPending){
    return <PacmanLoader color="#36d7b7" />
  }

  return (
    <div className="bg-gray-50 p-8">
      <div className="my-20 max-w-screen-xl mx-auto text-center">
        <div className="">
          <div className="flex-1">
            <h2 className="text-4xl font-bold "> Our Premium Members</h2>
            <p className="w-1/2 mx-auto mt-2 ">
              Premium members enjoy exclusive features, enhanced visibility, and
              personalized matchmaking for the best chances of finding their
              perfect match
            </p>
          </div>
          <div className="flex justify-end ">
            <Dropdown
              style={{
                color: "black",
                border: "2px solid #FFD700",
              }}
              label={asc ? "Ascending" : "Descending"}
              dismissOnClick={false}
            >
              <Dropdown.Item
                className="text-black"
                onClick={() => setAsc(true)}
              >
                Ascending
              </Dropdown.Item>
              <Dropdown.Item
                className="text-black"
                onClick={() => setAsc(false)}
              >
                Descending
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   justify-items-center gap-6">
          {members.slice(0, 6)?.map((member) => (
            <Members_Card
              key={member.biodata_id}
              member={member}
            ></Members_Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium_Members;
