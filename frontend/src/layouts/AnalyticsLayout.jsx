import BackButton from "../components/BackButton";

export default function AnalyticsLayout({ children }) {
  return (
    <div style={{ padding: "24px" }}>
      <BackButton />
      {children}
    </div>
  );
}
