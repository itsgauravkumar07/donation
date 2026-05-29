import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalDonations: 0,
    totalAmountRaised: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4 shadow">
          <h2 className="text-lg font-semibold">
            Total Campaigns
          </h2>
          <p className="text-3xl mt-2">
            {stats.totalCampaigns}
          </p>
        </div>

        <div className="border rounded p-4 shadow">
          <h2 className="text-lg font-semibold">
            Total Donations
          </h2>
          <p className="text-3xl mt-2">
            {stats.totalDonations}
          </p>
        </div>

        <div className="border rounded p-4 shadow">
          <h2 className="text-lg font-semibold">
            Total Amount Raised
          </h2>
          <p className="text-3xl mt-2">
            ₹{stats.totalAmountRaised}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;