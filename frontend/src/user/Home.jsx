import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [campaigns, setCampaigns] = useState([]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

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

  const handleDonation = async (e) => {
    e.preventDefault();

    try {
      await api.post("/donations", {
        donorName,
        email,
        amount: Number(amount),
        campaignId: selectedCampaign,
      });

      alert("Donation Successful!");

      setDonorName("");
      setEmail("");
      setAmount("");
      setSelectedCampaign(null);

      fetchCampaigns();
    } catch (error) {
      console.error(error);
      alert("Donation Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Campaigns
      </h1>

      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="text-xl font-semibold">
              {campaign.title}
            </h2>

            <p className="mt-2">
              {campaign.description}
            </p>

            <p className="mt-2">
              <strong>Target:</strong> ₹{campaign.targetAmount}
            </p>

            <p>
              <strong>Raised:</strong> ₹{campaign.raisedAmount}
            </p>

            <p>
              <strong>Status:</strong> {campaign.status}
            </p>

            <button
              onClick={() => setSelectedCampaign(campaign._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
            >
              Donate
            </button>

            {selectedCampaign === campaign._id && (
              <form
                onSubmit={handleDonation}
                className="mt-4 flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={donorName}
                  onChange={(e) =>
                    setDonorName(e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                />

                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Submit Donation
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;