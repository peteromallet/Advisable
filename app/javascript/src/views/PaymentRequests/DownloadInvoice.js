import React from "react";
import { Download } from "@styled-icons/heroicons-solid";
import { Button } from "@advisable/donut";

export default function DownloadInvoice({ payment }) {
  if (!payment) return null;

  return (
    <a href={payment.pdfUrl}>
      <Button size="s" variant="subtle" prefix={<Download />}>
        Download invoice
      </Button>
    </a>
  );
}
