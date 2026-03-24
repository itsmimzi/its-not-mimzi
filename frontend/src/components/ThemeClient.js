"use client";

import { useEffect } from "react";

export default function ThemeClient() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial = stored || "dark"; 

    document.documentElement.classList.toggle("dark-theme", initial === "dark");
  }, []);

  return null;
}
