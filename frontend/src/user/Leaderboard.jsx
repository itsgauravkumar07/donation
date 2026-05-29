import { useEffect, useState } from "react";
import api from "../services/api";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/leaderboard");
      setLeaders(res.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        🏆 Top Donors Leaderboard
      </h1>

      {leaders.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="space-y-4">
          {leaders.map((leader, index) => (
            <div
              key={leader._id}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  #{index + 1} {leader._id}
                </h2>
              </div>

              <div className="text-green-600 font-bold text-xl">
                ₹{leader.totalDonated}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;