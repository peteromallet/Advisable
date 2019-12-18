import React from "react";
import { motion } from "framer-motion";
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

  return (
    <>
      <PopoverDisclosure
        as={Detail}
        disabled={readOnly}
        readOnly={readOnly}
        {...popover}
      >
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
        {...popover}
        aria-label="Quote"
        style={{ width: "100%", maxWidth: 320, outline: "none" }}
      >
        <Card
          padding="m"
          elevation="xl"
          as={motion.div}
          animate={{
            y: popover.visible ? 0 : 20,
            opacity: popover.visible ? 1 : 0,
          }}
        >
          {popover.visible && (
            <QuoteInputPopout
              task={task}
              onCancel={popover.hide}
              onSuccess={popover.hide}
            />
          )}
        </Card>
      </Popover>
    </>
  );
};

export default QuoteInput;
