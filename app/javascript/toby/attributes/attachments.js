import React from "react";
import { useField } from "formik";
import { Input } from "@advisable/donut";
import { DocumentDownload } from "@styled-icons/heroicons-solid";

export default {
  render: function RenderAttachments({ record, attribute }) {
    const attachments = record[attribute.name] || [];
    return attachments.map((a) => a.filename).join(", ");
  },
  renderDetail: function RenderAttachmentsDetail({ record, attribute }) {
    const attachments = record[attribute.name] || [];
    return (
      <div className="divide-y divide-solid divide-neutral-200">
        {attachments.map((a) => (
          <div key={a.id} className="py-3">
            <a
              rel="noreferrer"
              href={`${window.location.origin}/toby/download/${a.id}`}
              target="_blank"
              className="text-blue500 hover:text-blue800 inline-flex items-center gap-1"
            >
              <DocumentDownload className="w-5 h-5" />
              {a.filename} ({a.size})
            </a>
          </div>
        ))}
      </div>
    );
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || "";
  },
  copy: function (attribute, record) {
    return record[attribute.name] || "";
  },
  input: function StringAttributeInput({ attribute, record }) {
    const [field, meta] = useField(attribute.name);
    if (attribute.readonly) return record[attribute.name];

    const error = meta.touched && meta.error;

    return <Input size="sm" error={error} {...field} />;
  },
};
