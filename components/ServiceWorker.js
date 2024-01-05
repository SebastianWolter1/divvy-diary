"use client";
import { registerServiceWorker } from "@/utils/serviceWorker";
import { useEffect } from "react";

function Serviceworker() {
  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker();
      } catch (error) {
        console.error(error);
      }
    }
    setUpServiceWorker();
  }, []);

  return null;
}

export default Serviceworker;
