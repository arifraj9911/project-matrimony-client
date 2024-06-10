import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import React, { PureComponent } from 'react';
import { FaUsers, FaMale, FaFemale, FaCrown, FaMoneyBill } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";
import { Cell, Legend, Pie, PieChart } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#81A263"];

const AdminDashboard = () => {
  const { data: biodataCount = {}, isPending } = useQuery({
    queryKey: ["biodataCount"],
    queryFn: async () => {
      const res = await axios.get("https://project-matrimony-server.vercel.app/admin-stats", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(res.data);
      return res.data;
    },
  });

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = [
    { name: "totalBiodata", value: biodataCount.totalBiodata },
    { name: "maleBiodata", value: biodataCount.maleBiodata },
    { name: "femaleBiodata", value: biodataCount.femaleBiodata },
    { name: "revenue", value: biodataCount.revenue },
    { name: "premiumBiodata", value: biodataCount.premiumBiodata },
  ];

  if (isPending) {
    return <PacmanLoader color="#36d7b7" />;
  }

  return (
    <div>
      <h2 className="text-2xl mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaUsers className="text-2xl mx-auto text-indigo-500 mb-4" />
          <h3 className="text-[16px] font-semibold">Total Biodata</h3>
          <p className="text-2xl">{biodataCount?.totalBiodata}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaMale className="text-2xl mx-auto text-blue-500 mb-4" />
          <h3 className="text-[16px] font-semibold">Male Biodata</h3>
          <p className="text-2xl">{biodataCount?.maleBiodata}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaFemale className="text-2xl mx-auto text-pink-500 mb-4" />
          <h3 className="text-[16px] font-semibold">Female Biodata</h3>
          <p className="text-2xl">{biodataCount?.femaleBiodata}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaCrown className="text-2xl mx-auto text-yellow-300 mb-4" />
          <h3 className="text-[16px] font-semibold">Premium Biodata</h3>
          <p className="text-2xl">{biodataCount?.premiumBiodata}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FaMoneyBill className="text-2xl mx-auto text-red-500 mb-4" />
          <h3 className="text-[16px] font-semibold">Total Revenue</h3>
          <p className="text-2xl">${biodataCount?.revenue}</p>
        </div>
      </div>
      <div className="">
        <PieChart className="mx-auto" width={700} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashboard;
