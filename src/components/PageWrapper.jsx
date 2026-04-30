import { useEffect, useState } from "react";

export default function PageWrapper({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    return () => setVisible(false);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.35s ease",
      }}
    >
      {children}
    </div>
  );
}
