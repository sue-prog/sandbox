import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        marginBottom: "16px",
        padding: "6px 12px",
        fontSize: "14px",
        cursor: "pointer"
      }}
    >
      ← Back
    </button>
  );
}
