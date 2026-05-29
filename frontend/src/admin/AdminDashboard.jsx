import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [donations, setDonations] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchDonations();
    fetchLeaderboard();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await api.get("/donations");
      setDonations(res.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/leaderboard");
      setLeaders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-gray-500">
            Total Campaigns
          </h2>

          <p className="text-3xl font-bold">
            {stats.totalCampaigns || 0}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-gray-500">
            Total Donations
          </h2>

          <p className="text-3xl font-bold">
            {stats.totalDonations || 0}
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="text-gray-500">
            Total Amount Raised
          </h2>

          <p className="text-3xl font-bold text-green-600">
            ₹{stats.totalAmountRaised || 0}
          </p>
        </div>
      </div>

      {/* Top Donor */}
      <div className="bg-white rounded-lg shadow p-5 mb-8">
        <h2 className="text-xl font-bold mb-4">
          🏆 Top Donor
        </h2>

        {leaders.length > 0 ? (
          <div>
            <p className="text-lg font-semibold">
              {leaders[0]._id}
            </p>

            <p className="text-green-600 font-bold">
              ₹{leaders[0].totalDonated}
            </p>
          </div>
        ) : (
          <p>No donations yet.</p>
        )}
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-bold mb-4">
          Recent Donations
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">
                Donor
              </th>

              <th className="border p-2">
                Amount
              </th>

              <th className="border p-2">
                Campaign
              </th>
            </tr>
          </thead>

          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td className="border p-2">
                  {donation.donorName}
                </td>

                <td className="border p-2">
                  ₹{donation.amount}
                </td>

                <td className="border p-2">
                  {donation.campaignId?.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminDashboard;