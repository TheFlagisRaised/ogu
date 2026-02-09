"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "bg-dark-950 text-gray-200 antialiased";
  }, []);

  return (
    <body className="bg-dark-950 text-gray-200 antialiased">
      {children}
    </body>
  );
}
