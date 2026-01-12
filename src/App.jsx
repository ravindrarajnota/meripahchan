import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import UserDetails from "./pages/UserDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />}>
          {/* DEFAULT PAGE */}
          <Route index element={<Navigate to="/users" replace />} />

          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
        </Route>

        {/* Public QR Page */}
        <Route path="users/view/:id" element={<UserDetails />} /> {/* /users/view/1 */}
      </Routes>
    </BrowserRouter>
  );
}
