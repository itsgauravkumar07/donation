import { useEffect, useState } from "react";
import api from "../services/api";

function Donations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get("/donations");
      setDonations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Donations
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Donor</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Campaign</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td className="border p-2">
                  {donation.donorName}
                </td>

                <td className="border p-2">
                  {donation.email}
                </td>

                <td className="border p-2">
                  ₹{donation.amount}
                </td>

                <td className="border p-2">
                  {donation.campaignId?.title}
                </td>

                <td className="border p-2">
                  {new Date(
                    donation.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donations;