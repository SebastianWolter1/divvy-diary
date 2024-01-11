import React from "react";
import Cta from "./Cta";

const AlarmsSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="text-center w-full grid grid-cols-3 gap-2 items-center rounded mb-2 bg-gray-400 dark:bg-gray-600"
        >
          <div>
            <p className="text-gray-200 dark:text-gray-400 font-semibold">
              Aktie
            </p>
            <p className="text-[10px] text-gray-200 dark:text-gray-400 ">
              Isin
            </p>
          </div>
          <p className="text-xs text-gray-200 dark:text-gray-400 ">Preis</p>
          <div>
            <Cta type="skeleton" />
          </div>
        </div>
      ))}
    </>
  );
};

export default AlarmsSkeleton;
