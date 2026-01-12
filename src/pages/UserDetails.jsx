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

  if (!user) {
    return <div className="page"><p><h2>Loading.....</h2></p></div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 4 }}>
          {isPublicQR ? "Meri Pahchan" : "User Details"}
        </h2>
        <p style={styles.subText}>Verified Identity</p>

        <Info label="Name" value={user.name} />

        <ContactRow
          label="Mobile"
          number={user.mobile}
        />

        {user.alternative_number && (
          <ContactRow
            label="Alternate"
            number={user.alternative_number}
          />
        )}

        {!isPublicQR && <Info label="Status" value={user.status} />}

        {/* 🚓 Emergency Section */}
        <div style={styles.emergencyBox}>
          <h4 style={{ marginBottom: 10 }}>Emergency Contacts</h4>

          <EmergencyButton
            label="Police"
            number="112"
            color="#dc3545"
            icon="🚓"
          />

          <EmergencyButton
            label="Ambulance"
            number="108"
            color="#fd7e14"
            icon="🚑"
          />
        </div>

        {!isPublicQR && (
          <>
            <QRCard value={window.location.href} />
            <p style={styles.footerText}>Verified via MeriPahchan</p>
          </>
        )}

        <p style={styles.powered}>Powered by MeriPahchan</p>
      </div>
    </div>
  );
}

/* 🔹 Contact Row with Call + WhatsApp */
function ContactRow({ label, number }) {
  return (
    <div style={styles.row}>
      <div>
        <strong>{label}:</strong>
        <div>{number}</div>
      </div>

      <div style={styles.actions}>
        <a href={`tel:${number}`} style={styles.iconBtn}>📞</a>
        <a
          href={`https://wa.me/91${number}`}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.iconBtn}
        >
          💬
        </a>
      </div>
    </div>
  );
}

/* 🔹 Emergency Button */
function EmergencyButton({ label, number, color, icon }) {
  return (
    <a
      href={`tel:${number}`}
      style={{
        ...styles.emergencyBtn,
        background: color
      }}
    >
      {icon} {label} ({number})
    </a>
  );
}

/* 🔹 Simple info row */
function Info({ label, value }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <strong>{label}:</strong>
      <div>{value}</div>
    </div>
  );
}

/* 🔹 Styles */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  card: {
    background: "#fff",
    maxWidth: 420,
    width: "100%",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },
  subText: {
    color: "#777",
    marginBottom: 20,
    fontSize: 14
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
  },
  actions: {
    display: "flex",
    gap: 10
  },
  iconBtn: {
    fontSize: 20,
    textDecoration: "none"
  },
  emergencyBox: {
    marginTop: 20,
    padding: 16,
    background: "#f8f9fa",
    borderRadius: 12
  },
  emergencyBtn: {
    display: "block",
    color: "#fff",
    padding: "12px",
    borderRadius: 10,
    textAlign: "center",
    textDecoration: "none",
    fontWeight: 600,
    marginBottom: 10
  },
  footerText: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 13,
    color: "#777"
  },
  powered: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 12,
    color: "#aaa"
  }
};


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

//   if (!user)
//     return (
//       <div className="page">
//         <p>User not found</p>
//       </div>
//     );

//   return (
//     <div
//       className="page"
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "#f6f7fb",
//         padding: 16
//       }}
//     >
//       <div
//         className="card"
//         style={{
//           maxWidth: 420,
//           width: "100%",
//           padding: 24,
//           borderRadius: 16,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//           background: "#fff",
//           textAlign: "center"
//         }}
//       >
//         <h2 style={{ marginBottom: 8 }}>
//           {isPublicQR ? "Meri Pahchan" : "User Details"}
//         </h2>

//         <p style={{ color: "#777", marginBottom: 20 }}>
//           Verified Identity
//         </p>

//         <div style={{ textAlign: "left", marginBottom: 20 }}>
//           <Info label="Name" value={user.name} />
//           <Info label="Mobile" value={user.mobile} />
//           {user.alternative_number && (
//             <Info label="Alt Number" value={user.alternative_number} />
//           )}
//           {!isPublicQR && <Info label="Status" value={user.status} />}
//         </div>

//         {/* 📞 Call Button */}
//         <a
//           href={`tel:${user.mobile}`}
//           style={{
//             display: "block",
//             textDecoration: "none",
//             background: "#28a745",
//             color: "#fff",
//             padding: "14px 20px",
//             borderRadius: 10,
//             fontSize: 16,
//             fontWeight: 600,
//             marginBottom: 12
//           }}
//         >
//           📞 Call Now
//         </a>

//         {/* 💬 WhatsApp */}
//         <a
//           href={`https://wa.me/91${user.mobile}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{
//             display: "block",
//             textDecoration: "none",
//             background: "#25D366",
//             color: "#fff",
//             padding: "12px 20px",
//             borderRadius: 10,
//             fontSize: 15,
//             fontWeight: 500,
//             marginBottom: 20
//           }}
//         >
//           💬 WhatsApp
//         </a>

//         {!isPublicQR && (
//           <>
//             <QRCard value={window.location.href} />
//             <p style={{ marginTop: 12, fontSize: 13, color: "#888" }}>
//               Verified via MeriPahchan
//             </p>
//           </>
//         )}

//         <p style={{ marginTop: 16, fontSize: 12, color: "#aaa" }}>
//           Powered by MeriPahchan
//         </p>
//       </div>
//     </div>
//   );
// }

// /* 🔹 Small reusable info row */
// function Info({ label, value }) {
//   return (
//     <div style={{ marginBottom: 10 }}>
//       <strong style={{ color: "#555" }}>{label}:</strong>
//       <div style={{ fontSize: 15 }}>{value}</div>
//     </div>
//   );
// }



// // import { useParams, useLocation } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { UserAPI } from "../api/api";
// // import QRCard from "../components/QRCard";

// // export default function UserDetails() {
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const isPublicQR = location.pathname.startsWith("/qr");
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     UserAPI.getById(id).then((res) => setUser(res.data));
// //   }, [id]);

// //   if (!user) return <div className="page"><p>User not found</p></div>;

// //   return (
// //     <div className="page" style={{ display: "flex", justifyContent: "center" }}>
// //       <div className="card" style={{ maxWidth: 500, width: "100%", padding: 30 }}>
// //         <h2 style={{ marginBottom: 20 }}>
// //           {isPublicQR ? "Meri Pahchan" : "User Details"}
// //         </h2>

// //         <div style={{ marginBottom: 12 }}>
// //           <strong>Name:</strong> {user.name}
// //         </div>
// //         <div style={{ marginBottom: 12 }}>
// //           <strong>Mobile:</strong> {user.mobile}
// //         </div>
// //         <div style={{ marginBottom: 12 }}>
// //           <strong>Alt Number:</strong> {user.alternative_number}
// //         </div>
// //         <div style={{ marginBottom: 12 }}>
// //           <strong>Agent:</strong> {user.agentId}
// //         </div>
// //         <div style={{ marginBottom: 12 }}>
// //           <strong>Status:</strong> {user.status}
// //         </div>

// //         {!isPublicQR && (
// //           <>
// //             <QRCard value={window.location.href} />
// //             <p style={{ marginTop: 10, textAlign: "center", color: "#555" }}>
// //               Verified via MeriPahchan
// //             </p>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
