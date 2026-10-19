"use client";

import React from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // Website runs in default user mode — all pages are directly accessible
  return <>{children}</>;
}

