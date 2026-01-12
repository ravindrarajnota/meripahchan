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

  if (!user) return <div className="page"><p>User not found</p></div>;

  return (
    <div className="page" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card" style={{ maxWidth: 500, width: "100%", padding: 30 }}>
        <h2 style={{ marginBottom: 20 }}>
          {isPublicQR ? "Meri Pahchan" : "User Details"}
        </h2>

        <div style={{ marginBottom: 12 }}>
          <strong>Name:</strong> {user.name}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Mobile:</strong> {user.mobile}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Alt Number:</strong> {user.alternative_number}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Agent:</strong> {user.agentId}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Status:</strong> {user.status}
        </div>

        {!isPublicQR && (
          <>
            <QRCard value={window.location.href} />
            <p style={{ marginTop: 10, textAlign: "center", color: "#555" }}>
              Verified via MeriPahchan
            </p>
          </>
        )}
      </div>
    </div>
  );
}
