import { useEffect, useState } from "react";

export default function PageWrapper({
  children,
}) {

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setVisible(true);
    }, 40);

    return () => {
      clearTimeout(timer);
      setVisible(false);
    };

  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,

        transform: visible
          ? "translateY(0px) scale(1)"
          : "translateY(16px) scale(0.98)",

        filter: visible
          ? "blur(0px)"
          : "blur(4px)",

        transition:
          "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",

        willChange:
          "transform, opacity",

        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
}
