import { useEffect, useState } from "react";
import { RoleAPI } from "../api/api";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState("");

  const loadRoles = () => {
    RoleAPI.getAll().then((res) => setRoles(res.data));
  };

  useEffect(loadRoles, []);

  const createRole = () => {
    if (!name) return;
    RoleAPI.create({ name }).then(() => {
      setName("");
      loadRoles();
    });
  };

  return (
    <div className="page">
      <h3>Roles</h3>

      <div className="card">
        <input
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createRole}>Create Role</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>
                <button
                  className="danger"
                  onClick={() =>
                    RoleAPI.delete(r.id).then(loadRoles)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
