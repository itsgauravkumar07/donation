import { Link, Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div>
      <nav className="bg-blue-600 text-white p-4 flex gap-6">
        <Link to="/user">Campaigns</Link>
        <Link to="/user/dashboard">Dashboard</Link>
        <Link to="/user/donations">Donations</Link>
        <Link to="/user/leaderboard">Leaderboard</Link>
      </nav>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;