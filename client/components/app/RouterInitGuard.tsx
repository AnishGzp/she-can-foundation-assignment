"use client";
import { useEffect } from "react";

export default function RouterInitGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handlePopState = () => {
      window.location.reload(); // Full reload on back navigation
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return <>{children}</>;
}
