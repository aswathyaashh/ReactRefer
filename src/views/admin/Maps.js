import React from "react";

// components

import MapExample from "components/Maps/MapExample.js";

export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mt-12 mr-12 mb-6 ml-7 shadow-lg rounded ">
            <MapExample />
          </div>
        </div>
      </div>
    </>
  );
}
