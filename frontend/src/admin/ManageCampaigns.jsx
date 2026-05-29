import { useEffect, useState } from "react";
import api from "../services/api";

function ManageCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await api.get("/campaigns");
      setCampaigns(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();

    try {
      await api.post("/campaigns", {
        title,
        description,
        targetAmount: Number(targetAmount),
        raisedAmount: 0,
        status: "active",
      });

      alert("Campaign Created Successfully!");

      setTitle("");
      setDescription("");
      setTargetAmount("");

      fetchCampaigns();
    } catch (error) {
      console.error(error);
      alert("Failed to create campaign");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Manage Campaigns
      </h1>

      {/* Create Campaign Form */}
      <div className="bg-white shadow rounded-lg p-5 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create Campaign
        </h2>

        <form
          onSubmit={handleCreateCampaign}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Campaign Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <textarea
            placeholder="Campaign Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) =>
              setTargetAmount(e.target.value)
            }
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded"
          >
            Create Campaign
          </button>
        </form>
      </div>

      {/* Campaign List */}
      <div className="grid md:grid-cols-2 gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-white shadow rounded-lg p-5"
          >
            <h2 className="text-xl font-semibold mb-2">
              {campaign.title}
            </h2>

            <p className="text-gray-600 mb-3">
              {campaign.description}
            </p>

            <p>
              <strong>Target:</strong> ₹
              {campaign.targetAmount}
            </p>

            <p>
              <strong>Raised:</strong> ₹
              {campaign.raisedAmount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {campaign.status}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ManageCampaigns;