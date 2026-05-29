import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoleSelection from "./pages/RoleSelection";

import UserLayout from "./user/UserLayout";
import Home from "./user/Home";
import Dashboard from "./user/Dashboard";
import Donations from "./user/Donations";
import Leaderboard from "./user/Leaderboard";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageCampaigns from "./admin/ManageCampaigns";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />

        {/* User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="donations" element={<Donations />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route
            path="campaigns"
            element={<ManageCampaigns />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;