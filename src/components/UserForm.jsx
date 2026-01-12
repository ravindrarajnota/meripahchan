import { useState, useEffect } from "react";
import { UserAPI, SettingAPI } from "../api/api";
import QRCard from "./QRCard";

export default function UserForm({ onSuccess, editUser }) {
  const [baseUrl, setBaseUrl] = useState("");
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await SettingAPI.getAll();
        if (res.data && res.data.length > 0) {
          setBaseUrl(res.data[0].Base_url);
        }
      } catch (err) {
        console.error("Settings error:", err);
      }
    };
  
    loadSettings();
  }, []);
  
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    alternative_number: "",
    // agent_id: "1",
    // role_id: "1",
    status: true,
  });

  // 🔹 When editUser changes, reset form
  useEffect(() => {
    if (editUser) {
      setForm(editUser);
    } else {
      setForm({
        name: "",
        mobile: "",
        alternative_number: "",
        agent_id: "1",
        role_id: "1",
        other: "",
        qrlink: "",
        status: 1,
      });
    }
  }, [editUser]);

  // const submit = async () => {
  //   try {
  //     if (editUser) {
  //       await UserAPI.update(editUser.id, form);
  //     } else {
  //       await UserAPI.create(form);
  //     }
  //     onSuccess(); // refresh list
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const submit = async () => {
    try {
      if (editUser) {
        await UserAPI.update(editUser.id, form);
        onSuccess();
      } else {
        const res = await UserAPI.create(form);
  
        // 🔥 store returned user ID
        setForm((prev) => ({
          ...prev,
          id: res.data.id,
        }));
  
        onSuccess();
      }
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
    }
  };
  

  return (
    <div className="card">
      <h3>{editUser ? "Edit User" : "Create User"}</h3>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Mobile"
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
      />

      <input
        placeholder="Alternative Number"
        value={form.alternative_number}
        onChange={(e) =>
          setForm({ ...form, alternative_number: e.target.value })
        }
      />

      {/* <input
        placeholder="Agent ID"
        value={form.agentId}
        onChange={(e) => setForm({ ...form, agentId: e.target.value })}
      />
      <input
        placeholder="Role ID"
        value={form.agentId}
        onChange={(e) => setForm({ ...form, agentId: e.target.value })}
      /> */}

      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>

      <button onClick={submit}>
        {editUser ? "Update User" : "Save & Generate QR"}
      </button>

      {/* Optional: show QR if editing */}

      {form.id && baseUrl && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <QRCard value={`${baseUrl}/users/view/${form.id}`} />
          <p style={{ fontSize: 12, marginTop: 8, color: "#555" }}>
            Scan to view user
          </p>
        </div>
      )}

      {/* {form.id && <QRCard value={`http://localhost:5173/users/view/${form.id}`} />} */}
    </div>
  );
}
