import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
