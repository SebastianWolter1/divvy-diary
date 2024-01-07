"use client";

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

const Provider = ({ children }) => {
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default Provider;
