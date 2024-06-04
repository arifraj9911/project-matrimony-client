import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminDashboard = () => {
  const { data: biodataCount = {}, isPending } = useQuery({
    queryKey: ["biodataCount"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/admin-stats");
      console.log(res.data);
      return res.data;
    },
  });

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
    </div>
  );
};

export default AdminDashboard;
