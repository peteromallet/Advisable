import React, { useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { rgba } from "polished";
import { variant } from "styled-system";
import { theme } from "@advisable/donut";
import { Link } from "react-router-dom";
import { CheckmarkCircle, Moon } from "@styled-icons/ionicons-solid";
import MessageAction from "./MessageAction";
import AcceptApplication from "./AcceptApplication";
import RejectApplication from "./RejectApplication";
import { ActionBarContext } from "./ActionBarContainer";

const StyledActionBar = styled.div`
  bottom: 16px;
  height: 100px;
  display: flex;
  position: fixed;
  padding: 0 20px;
  border-radius: 40px;
  align-items: center;
  background: rgba(255, 255, 255, 0.96);

  box-shadow: 0px 4px 12px ${rgba(theme.colors.neutral900, 0.04)},
    0px 12px 24px ${rgba(theme.colors.neutral900, 0.08)},
    0px 24px 64px ${rgba(theme.colors.neutral900, 0.16)};
`;

const StyledActionBarItemIcon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  position: relative;
  margin-bottom: 6px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.blue900};

  &::before {
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 50%;
    position: absolute;
    background: #e6e6ec;
    transition: transform 200ms;
  }

  svg {
    z-index: 2;
    width: 24px;
    height: 24px;
    color: currentColor;
  }
`;

const StyledActionBarItem = styled.button`
  appearance: none;
  width: 80px;
  height: 72px;
  border: none;
  margin: 0 2px;
  outline: none;
  color: #4c5061;
  cursor: pointer;
  font-weight: 500;
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.03em;

  &:hover {
    color: ${theme.colors.blue700};

    ${StyledActionBarItemIcon} {
      color: ${theme.colors.blue600};
    }

    ${StyledActionBarItemIcon}::before {
      transform: scale(1.12);
    }
  }

  ${variant({
    variants: {
      primary: {
        color: "#001988",
        [StyledActionBarItemIcon]: {
          "::before": {
            background: "#DEE4FC",
          },
        },
      },
    },
  })}
`;

function ActionBar({ application, project }) {
  const bar = React.useRef(null);
  const barContext = useContext(ActionBarContext);

  const reposition = React.useCallback(() => {
    if (!bar.current) return;
    const width = bar.current.clientWidth || 0;
    const left = barContext.left + barContext.width / 2 - width / 2;
    bar.current.style.left = `${left}px`;
  }, [barContext, bar]);

  React.useEffect(() => {
    reposition();
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("resice", reposition);
    };
  }, [reposition]);

  return (
    <StyledActionBar
      ref={bar}
      as={motion.div}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {application.status === "Applied" ? (
        <AcceptApplication application={application} project={project} />
      ) : (
        <ActionBar.Item
          as={Link}
          label="Hire"
          variant="primary"
          icon={<CheckmarkCircle />}
          to={`/book/${application.id}`}
        />
      )}
      <ActionBar.Item icon={<Moon />} label="Not Sure" />
      {application.status !== "Applied" && (
        <MessageAction application={application} />
      )}
      <RejectApplication application={application} />
    </StyledActionBar>
  );
}

ActionBar.Item = React.forwardRef(function ActionBarItem(
  { icon, label, variant, ...props },
  ref,
) {
  return (
    <StyledActionBarItem variant={variant} ref={ref} {...props}>
      <StyledActionBarItemIcon>{icon}</StyledActionBarItemIcon>
      <span>{label}</span>
    </StyledActionBarItem>
  );
});

export default ActionBar;
