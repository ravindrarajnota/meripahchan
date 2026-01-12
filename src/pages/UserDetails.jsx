import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAPI } from "../api/api";
import QRCard from "../components/QRCard";

export default function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const isPublicQR = location.pathname.startsWith("/qr");
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserAPI.getById(id).then((res) => setUser(res.data));
  }, [id]);

  if (!user)
    return (
      <div className="page">
        <p>User not found</p>
      </div>
    );

  return (
    <div
      className="page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6f7fb",
        padding: 16
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: 420,
          width: "100%",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          background: "#fff",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: 8 }}>
          {isPublicQR ? "Meri Pahchan" : "User Details"}
        </h2>

        <p style={{ color: "#777", marginBottom: 20 }}>
          Verified Identity
        </p>

        <div style={{ textAlign: "left", marginBottom: 20 }}>
          <Info label="Name" value={user.name} />
          <Info label="Mobile" value={user.mobile} />
          {user.alternative_number && (
            <Info label="Alt Number" value={user.alternative_number} />
          )}
          {!isPublicQR && <Info label="Status" value={user.status} />}
        </div>

        {/* 📞 Call Button */}
        <a
          href={`tel:${user.mobile}`}
          style={{
            display: "block",
            textDecoration: "none",
            background: "#28a745",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 12
          }}
        >
          📞 Call Now
        </a>

        {/* 💬 WhatsApp */}
        <a
          href={`https://wa.me/91${user.mobile}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            textDecoration: "none",
            background: "#25D366",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 500,
            marginBottom: 20
          }}
        >
          💬 WhatsApp
        </a>

        {!isPublicQR && (
          <>
            <QRCard value={window.location.href} />
            <p style={{ marginTop: 12, fontSize: 13, color: "#888" }}>
              Verified via MeriPahchan
            </p>
          </>
        )}

        <p style={{ marginTop: 16, fontSize: 12, color: "#aaa" }}>
          Powered by MeriPahchan
        </p>
      </div>
    </div>
  );
}

/* 🔹 Small reusable info row */
function Info({ label, value }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <strong style={{ color: "#555" }}>{label}:</strong>
      <div style={{ fontSize: 15 }}>{value}</div>
    </div>
  );
}



// import { useParams, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { UserAPI } from "../api/api";
// import QRCard from "../components/QRCard";

// export default function UserDetails() {
//   const { id } = useParams();
//   const location = useLocation();
//   const isPublicQR = location.pathname.startsWith("/qr");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     UserAPI.getById(id).then((res) => setUser(res.data));
//   }, [id]);

//   if (!user) return <div className="page"><p>User not found</p></div>;

//   return (
//     <div className="page" style={{ display: "flex", justifyContent: "center" }}>
//       <div className="card" style={{ maxWidth: 500, width: "100%", padding: 30 }}>
//         <h2 style={{ marginBottom: 20 }}>
//           {isPublicQR ? "Meri Pahchan" : "User Details"}
//         </h2>

//         <div style={{ marginBottom: 12 }}>
//           <strong>Name:</strong> {user.name}
//         </div>
//         <div style={{ marginBottom: 12 }}>
//           <strong>Mobile:</strong> {user.mobile}
//         </div>
//         <div style={{ marginBottom: 12 }}>
//           <strong>Alt Number:</strong> {user.alternative_number}
//         </div>
//         <div style={{ marginBottom: 12 }}>
//           <strong>Agent:</strong> {user.agentId}
//         </div>
//         <div style={{ marginBottom: 12 }}>
//           <strong>Status:</strong> {user.status}
//         </div>

//         {!isPublicQR && (
//           <>
//             <QRCard value={window.location.href} />
//             <p style={{ marginTop: 10, textAlign: "center", color: "#555" }}>
//               Verified via MeriPahchan
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
