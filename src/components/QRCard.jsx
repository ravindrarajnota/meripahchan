import { QRCodeCanvas } from "qrcode.react";

export default function QRCard({ value }) {
  if (!value) return null;

  return (
    <div className="qr-card">
      <QRCodeCanvas value={value} size={180} />
      <p className="qr-text">Scan to view profile</p>
    </div>
  );
}
