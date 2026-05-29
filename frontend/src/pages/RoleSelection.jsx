import { Link } from "react-router-dom";

function RoleSelection() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-4xl font-bold">
        Donation Tracking System
      </h1>

      <div className="flex gap-4">
        <Link
          to="/user"
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Continue as User
        </Link> <br />

        <Link
          to="/admin"
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Continue as Admin
        </Link>
      </div>
    </div>
  );
}

export default RoleSelection;