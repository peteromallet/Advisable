import React from "react";
import { Icon, Card } from "@advisable/donut";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import { hoursLabel, displayTaskQuote } from "../../../utilities/tasks";
import {
  Detail,
  DetailIcon,
  DetailLabel,
  DetailValue,
  DetailPlaceholder,
  ArrowPrompt,
} from "../styles";
import QuoteInputPopout from "./QuoteInputPopout";

const QuoteInput = ({ task, readOnly, onSubmit }) => {
  const popover = usePopoverState({ placement: "bottom-start" });

  const handleSubmit = async values => {
    await onSubmit(values);
    popover.hide();
  };

  return (
    <>
      <PopoverDisclosure as={Detail} readOnly={readOnly} {...popover}>
        {task.stage === "Quote Requested" && (
          <ArrowPrompt>
            <Icon icon="arrow-up" strokeWidth={2} />
          </ArrowPrompt>
        )}
        <DetailIcon prompt={task.stage === "Quote Requested"}>
          <Icon strokeWidth={1} width={20} icon="clock" />
        </DetailIcon>
        <DetailLabel>{hoursLabel(task)}</DetailLabel>
        {task.estimate ? (
          <DetailValue>{displayTaskQuote(task)}</DetailValue>
        ) : (
          <DetailPlaceholder>+ Add estimate</DetailPlaceholder>
        )}
      </PopoverDisclosure>
      <Popover
        as={Card}
        {...popover}
        padding="m"
        width="100%"
        elevation="l"
        maxWidth={320}
        aria-label="Quote"
      >
        {popover.visible && (
          <QuoteInputPopout
            onCancel={popover.hide}
            onSubmit={handleSubmit}
            task={task}
          />
        )}
      </Popover>
    </>
  );
};

export default QuoteInput;
