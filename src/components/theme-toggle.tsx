"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunDimIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button size="sm" variant="outline">
        <SunDimIcon />
      </Button>
    );
  }

  const next = theme === "dark" ? "light" : "dark";
  return (
    <Button size="sm" variant="outline" onClick={() => setTheme(next)}>
      {theme === "dark" ? <MoonIcon /> : <SunDimIcon />}
    </Button>
  );
}
