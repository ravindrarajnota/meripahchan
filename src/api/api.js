// src/api/api.js
import axios from "axios";

/**
 * SWITCH THIS FLAG
 * true  -> use dummy data
 * false -> use real backend APIs
 */
const USE_MOCK = false;

/* =========================
   DUMMY DATA (In-Memory)
========================= */

let users = [
  {
    id: 1,
    name: "Ravi Kumar",
    mobile: "9876543210",
    alternative_number: "9123456789",
    agentId: "AG001",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Anita Sharma",
    mobile: "9988776655",
    alternative_number: "",
    agentId: "AG002",
    status: "INACTIVE",
  },
];

let roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Agent" },
];

let settings = [
    { id: 1, baseUrl: "http://localhost:5173" }
  ];

/* =========================
   REAL API (for later)
========================= */

export const api = axios.create({
  baseURL: "https://meripehachan-9.onrender.com/api",
});

/* =========================
   USER API
========================= */

export const UserAPI = {
  getAll: () => {
    if (USE_MOCK) {
      return Promise.resolve({ data: users });
    }
    return api.get("/users");
  },

  getById: (id) => {
    if (USE_MOCK) {
    //   const user = users.find((u) => u.id == id);
      const user = users.find((u) => u.id === Number(id));

      return Promise.resolve({ data: user });
    }
    return api.get(`/users/${id}`);
  },

  create: (data) => {
    if (USE_MOCK) {
      const newUser = {
        id: Date.now(),
        ...data,
      };
      users.push(newUser);
      return Promise.resolve({ data: newUser });
    }
    return api.post("/users/add", data);
  },

  update: (id, data) => {
    if (USE_MOCK) {
      users = users.map((u) =>
        u.id === id ? { ...u, ...data } : u
      );
      return Promise.resolve({ data });
    }
    return api.put(`/users/${id}`, data);
  },

  delete: (id) => {
    if (USE_MOCK) {
      users = users.filter((u) => u.id !== id);
      return Promise.resolve({ data: true });
    }
    return api.delete(`/users/${id}`);
  },
};

/* =========================
   ROLE API
========================= */

export const RoleAPI = {
  getAll: () => {
    if (USE_MOCK) {
      return Promise.resolve({ data: roles });
    }
    return api.get("/roles");
  },

  create: (data) => {
    if (USE_MOCK) {
      const newRole = {
        id: Date.now(),
        ...data,
      };
      roles.push(newRole);
      return Promise.resolve({ data: newRole });
    }
    return api.post("/roles", data);
  },
  update: (id, data) => {
    if (USE_MOCK) {
      users = users.map((u) =>
        u.id === id ? { ...u, ...data } : u
      );
      return Promise.resolve({ data });
    }
    return api.put(`/roles/${id}`, data);
  },

  delete: (id) => {
    if (USE_MOCK) {
      roles = roles.filter((r) => r.id !== id);
      return Promise.resolve({ data: true });
    }
    return api.delete(`/roles/${id}`);
  },
};

/* =========================
   SETTINGS API
========================= */

export const SettingAPI = {
    getAll: () => {
      if (USE_MOCK) {
        return Promise.resolve({ data: settings });
      }
      return api.get("/settings");
    },
  
    // create: (data) => {
    //   if (USE_MOCK) {
    //     const newRole = {
    //       id: Date.now(),
    //       ...data,
    //     };
    //     roles.push(newRole);
    //     return Promise.resolve({ data: newRole });
    //   }
    //   return api.post("/settings", data);
    // },
    // update: (id, data) => {
    //     if (USE_MOCK) {
    //       users = users.map((u) =>
    //         u.id === id ? { ...u, ...data } : u
    //       );
    //       return Promise.resolve({ data });
    //     }
    //     return api.put(`/settings/${id}`, data);
    //   },
    // delete: (id) => {
    //   if (USE_MOCK) {
    //     roles = roles.filter((r) => r.id !== id);
    //     return Promise.resolve({ data: true });
    //   }
    //   return api.delete(`/settings/${id}`);
    // },
  };
  