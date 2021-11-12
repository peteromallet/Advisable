import React from "react";
import LinkToRecord from "../components/LinkToRecord";

function RenderHasOne({ record, attribute }) {
  const value = record[attribute.name];
  if (!value) return null;
  return value?._label;
}

function RenderDetail({ record, attribute }) {
  const value = record[attribute.name];
  if (!value) return null;
  return <LinkToRecord record={record[attribute.name]} />;
}

export default {
  render: RenderHasOne,
  renderDetail: RenderDetail,
};
