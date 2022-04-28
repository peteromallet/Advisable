import { ExternalLink, Pencil } from "@styled-icons/heroicons-solid";
import { Modal, useModal, DialogDisclosure } from "@advisable/donut";
import React from "react";
import CircularButton from "src/components/CircularButton";
import useViewer from "src/hooks/useViewer";
import Button from "src/components/Button";

export default function EditCaseStudyButton({ article }) {
  const viewer = useViewer();
  const modal = useModal();

  if (viewer?.id !== article.specialist.id) {
    return null;
  }

  return (
    <>
      <DialogDisclosure {...modal}>
        {(disclosure) => (
          <CircularButton
            icon={Pencil}
            aria-label="Edit case study"
            {...disclosure}
          />
        )}
      </DialogDisclosure>
      <Modal modal={modal}>
        <div className="text-center p-4">
          <h4 className="text-3xl font-semibold mb-1">Edit case study</h4>
          <p className="mb-8 max-w-[320px] mx-auto">
            Any edits you make will take up to 10 minutes to be reflected live.
          </p>
          <a href={article.editorUrl} target="_blank">
            <Button size="lg" prefix={<ExternalLink />} className="inline-flex">
              Open Editor
            </Button>
          </a>
        </div>
      </Modal>
    </>
  );
}
