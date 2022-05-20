import React from "react";
import { Skeleton } from "@advisable/donut";

export default function Loading({ sizeForColumn, attributes }) {
  const cells = attributes.map((attr) => (
    <div
      className="toby-cell"
      key={attr.name}
      style={{ width: sizeForColumn(attr.name) }}
    >
      <Skeleton width={120} height={20} />
    </div>
  ));

  return (
    <>
      <div className="toby-row">{cells}</div>
      <div className="toby-row">{cells}</div>
      <div className="toby-row">{cells}</div>
      <div className="toby-row">{cells}</div>
      <div className="toby-row">{cells}</div>
    </>
  );
}
