import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/campaigns">Manage Campaigns</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default AdminLayout;