import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAPI } from "../api/api";

export default function UserDetails() {
  const { id } = useParams();
  const location = useLocation();
  const isPublicQR = location.pathname.startsWith("/qr");
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserAPI.getById(id).then((res) => setUser(res.data));
  }, [id]);

  if (!user) {
    return (
      <div style={styles.page}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 4, textAlign: "center" }}>
          {isPublicQR ? "Meri Pahchan" : "User Details"}
        </h2>
        <p style={styles.subText}>Verified Identity</p>
        <div style={styles.infoGrid}>
          <InfoCard label="Name" value={user.name} />
          <InfoCard label="Vehicle No." value={user.other} />
        </div>

        {/* 📱 Mobile & Alternate Numbers */}
        <div style={styles.contactGrid}>
          <ContactSquare label="Mobile" number={user.mobile} primary />
          {user.alternative_number && (
            <ContactSquare
              label="Alternate"
              number={user.alternative_number}
            />
          )}
        </div>

        {/* 🚨 Emergency – single line, not highlighted */}
        <div style={styles.emergencyRow}>
          <EmergencyLink label="Emergency" number="112" />
          <EmergencyLink label="Police" number="100" />
          <EmergencyLink label="Ambulance" number="108" />
        </div>

        <p style={styles.powered}>Powered by MeriPahchan</p>
      </div>
    </div>
  );
}

/* 🔹 Contact Square */
function ContactSquare({ label, number, primary }) {
  return (
    <div
      style={{
        ...styles.contactSquare,
        borderColor: primary ? "#0d6efd" : "#dee2e6"
      }}
    >
      <div style={styles.squareLabel}>{label}</div>
      <div style={styles.squareNumber}>{number}</div>

      {/* 📞 💬 Highlighted actions */}
      <div style={styles.squareActions}>
        <a href={`tel:${number}`} style={styles.callBtn}>📞</a>
        <a
          href={`https://wa.me/91${number}`}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.whatsappBtn}
        >
            <WhatsAppIcon />
        </a>
      </div>
    </div>
  );
}
function WhatsAppIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.02 3C9.39 3 4 8.38 4 15c0 2.65.88 5.1 2.36 7.1L4 29l7.12-2.29A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.62 28 15S22.64 3 16.02 3zm6.58 17.02c-.28.79-1.63 1.53-2.24 1.6-.57.06-1.3.09-2.1-.13-.48-.13-1.1-.36-1.9-.72-3.34-1.45-5.52-4.86-5.69-5.08-.17-.22-1.36-1.82-1.36-3.47 0-1.65.86-2.46 1.17-2.8.31-.34.68-.43.9-.43h.65c.2 0 .46-.07.72.55.28.62.95 2.16 1.03 2.31.09.15.15.34.03.55-.12.22-.18.35-.36.55-.18.2-.38.44-.55.6-.18.18-.36.37-.15.73.21.36.93 1.54 2 2.5 1.37 1.22 2.52 1.6 2.88 1.78.36.18.57.15.79-.09.22-.25.9-1.05 1.14-1.41.25-.36.49-.3.82-.18.34.12 2.13 1 2.5 1.18.37.18.61.27.7.42.09.15.09.86-.18 1.65z"/>
    </svg>
  );
}

/* 🚨 Emergency inline link */
function EmergencyLink({ label, number }) {
  return (
    <a href={`tel:${number}`} style={styles.emergencyLink}>
      {label}: <strong>{number}</strong>
    </a>
  );
}

function InfoCard({ label, value }) {
  return (
    <div style={styles.infoCard}>
      <div style={styles.infoLabel}>{label}</div>
      <div style={styles.infoValue}>{value}</div>
    </div>
  );
}

/* 🔹 Info Row */
function Info({ label, value }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <strong>{label}:</strong>
      <div>{value}</div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",   // ⬅️ IMPORTANT
    padding: 12
  },
  
  

  card: {
    background: "#fff",
    maxWidth: 420,
    width: "100%",
    padding: 24,
    borderRadius: 18,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    marginTop: 12
  },
  

  subText: {
    color: "#777",
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center"
  },

  /* Contacts */
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 20
  },

  contactSquare: {
    border: "2px solid",
    borderRadius: 14,
    padding: 14,
    textAlign: "center",
    background: "#fff"
  },

  squareLabel: {
    fontSize: 13,
    color: "#6c757d",
    marginBottom: 6
  },

  squareNumber: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12
  },

  squareActions: {
    display: "flex",
    justifyContent: "center",
    gap: 16
  },

/* 📞 Call – calm & premium */
callBtn: {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "#f1f3f5",
  color: "#212529",
  fontSize: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  border: "1px solid #dee2e6"
},

/* 💬 WhatsApp – subtle green */
/* 💬 WhatsApp – light & subtle */
whatsappBtn: {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "#f3faf5",
  color: "#5fcf8e",
  fontSize: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  border: "1px solid #e1f3e7"
},

emergencyRow: {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 24,
  paddingTop: 14,
  borderTop: "1px solid #e9ecef",
  fontSize: 13,
  background: "#fff"
},


emergencyLink: {
  color: "#495057",
  textDecoration: "none"
},

powered: {
  marginTop: "auto",   // ⬅️ pushes to bottom
  textAlign: "center",
  fontSize: 12,
  color: "#aaa",
  paddingTop: 16
},

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 16
  },
  
  infoCard: {
    background: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    textAlign: "center",
    border: "1px solid #eee"
  },
  
  infoLabel: {
    fontSize: 12,
    color: "#6c757d",
    marginBottom: 4
  },
  
  infoValue: {
    fontSize: 15,
    fontWeight: 600
  }
  
};
