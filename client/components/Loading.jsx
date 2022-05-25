import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

export function Loading({}) {
  return (
    <div className="flex justify-center mt-24">
      <MoonLoader color="#007ACB" size="2rem" />
    </div>
  );
}
