import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../api/api";
import UserForm from "../components/UserForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate();

  const loadUsers = () => {
    UserAPI.getAll().then(res => setUsers(res.data));
  };

  useEffect(loadUsers, []);

  return (
    <div className="page">

      <UserForm
        editUser={editUser}
        onSuccess={() => {
          setEditUser(null);
          loadUsers();
        }}
      />

      <div className="table">
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Alternative Mobile</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.mobile}</td>
                <td>{u.alternative_number}</td>
                <td>{u.status}</td>

                <td className="actions">
                  <button
                    className="secondary"
                    onClick={() => navigate(`/users/view/${u.id}`)}
                  >
                    View
                  </button>

                  <button
                    className="secondary"
                    onClick={() => setEditUser(u)}
                  >
                    Edit
                  </button>

                  <button
                    className="danger"
                    onClick={() => {
                      UserAPI.delete(u.id).then(loadUsers);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
