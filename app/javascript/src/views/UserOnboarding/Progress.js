import React from "react";
import composeStyles from "src/utilities/composeStyles";
import { STEPS } from "./index";

const numberStyles = composeStyles({
  base: `w-5 h-5 bg-neutral300 rounded-full text-white grid place-items-center text-xs font-semibold`,
  variants: {
    active: `!bg-blue900`,
    complete: `bg-blue500 bg-gradient-to-l from-blue500 to-purple500`,
  },
});

const labelStyles = composeStyles({
  base: `hidden lg:block text-neutral400 font-medium`,
  variants: {
    active: `!text-blue900`,
  },
});

function ProgressStep({ number, active, complete, children }) {
  return (
    <div className="flex items-center gap-2">
      <div className={numberStyles({ active, complete })}>
        {complete ? <CheckIcon /> : number}
      </div>
      <span className={labelStyles({ active, complete })}>{children}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="8" fill="none" viewBox="0 0 10 8">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M9.227.24a.7.7 0 01-.066.987l-5.714 6a.7.7 0 01-.922 0l-2.286-3a.7.7 0 11.922-1.054L2.986 4.77 8.239.173a.7.7 0 01.988.066z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default function Progress({ matchingStepIndex }) {
  return (
    <div className="flex items-center gap-2 lg:gap-5">
      {STEPS.map((step, index) => {
        return (
          <React.Fragment key={step.title}>
            <ProgressStep
              number={index + 1}
              path={step.path}
              active={index === matchingStepIndex}
              complete={matchingStepIndex > index}
            >
              {step.title}
            </ProgressStep>
            {index + 1 < STEPS.length && (
              <div className="h-px bg-neutral-300 w-[12px] lg:w-5" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
