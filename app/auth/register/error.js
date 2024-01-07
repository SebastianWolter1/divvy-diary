"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center mt-24 px-2">
      <div className="text-left">
        <h2 className="text-4xl mb-2">
          <span className="block font-semibold">Etwas ist schief gelaufen!</span>
          <span className="block text-orange-700">Versuch es nochmal</span>
        </h2>
        <button 
          className="bg-orange-600 hover:bg-orange-700 text-gray-300 dark:text-white font-bold py-2 px-4 rounded"
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </div>
  );
}