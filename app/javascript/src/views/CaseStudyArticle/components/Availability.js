import React from "react";

const Availability = ({ unavailableUntil }) => (
  <div className="flex justify-items-center items-center">
    {unavailableUntil ? (
      <>
        <div className="h-2.5 w-2.5 bg-gray-600 rounded-full mr-2" />
        <div>Unavailable for hire</div>
      </>
    ) : (
      <>
        <div className="h-2.5 w-2.5 bg-blue-700 rounded-full mr-2" />
        <div>Available for hire</div>
      </>
    )}
  </div>
);

export default Availability;
