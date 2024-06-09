import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import React, { PureComponent } from 'react';
import { Cell, Legend, Pie, PieChart } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#81A263"];

const AdminDashboard = () => {
  const { data: biodataCount = {}, isPending } = useQuery({
    queryKey: ["biodataCount"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/admin-stats", {
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl">Admin Dashboard</h2>
      <div className="flex gap-4 mt-8">
        <div className="border p-4 shadow-sm">
          <p>Total Biodata Count: {biodataCount?.totalBiodata}</p>
        </div>
        <div className="border p-4 shadow-sm">
          <p>Male Biodata Count: {biodataCount?.maleBiodata}</p>
        </div>
        <div className="border p-4 shadow-sm">
          <p>Female Biodata Count: {biodataCount?.femaleBiodata}</p>
        </div>
        <div className="border p-4 shadow-sm">
          <p>Premium Biodata Count: {biodataCount?.premiumBiodata}</p>
        </div>
        <div className="border p-4 shadow-sm">
          <p>Total Revenue: ${biodataCount?.revenue}</p>
        </div>
      </div>
      <div className="">
        <PieChart className="mx-auto" width={600} height={400}>
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
