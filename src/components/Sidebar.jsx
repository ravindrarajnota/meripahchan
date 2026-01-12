import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">MeriPahchan</h2>

      <nav>
        <NavLink to="/users" className="menu">
          Users
        </NavLink>

        <NavLink to="/roles" className="menu">
          Roles
        </NavLink>
      </nav>
    </aside>
  );
}
