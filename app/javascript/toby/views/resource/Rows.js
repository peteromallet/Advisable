import React from "react";
import * as Sentry from "@sentry/react";
import { useNavigate } from "react-router";
import { Exclamation } from "@styled-icons/heroicons-solid/Exclamation";
import { Attribute } from "../../attributes";
import { recordPath } from "../../utilities";
import CopyToClipboard from "../../components/CopyToClipboard";

export default function Rows({ edges, resource, sizeForColumn, attributes }) {
  const navigate = useNavigate();

  const openRecord = (record) => () => {
    navigate(recordPath(record), {
      state: location?.state,
    });
  };

  return edges.map(({ node }) => (
    <div className="toby-row" key={node.id} onClick={openRecord(node)}>
      {attributes.map((attr) => (
        <div
          className="toby-cell"
          style={{ width: sizeForColumn(attr.name) }}
          key={attr.name}
        >
          <Sentry.ErrorBoundary
            fallback={
              <div className="inline-flex items-center">
                <Exclamation size={16} />
                <span className="-mt-px ml-1">Error</span>
              </div>
            }
          >
            <CopyToClipboard record={node} attribute={attr} />
            <Attribute record={node} attribute={attr} resource={resource} />
          </Sentry.ErrorBoundary>
        </div>
      ))}
    </div>
  ));
}
