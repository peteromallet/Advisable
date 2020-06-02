// The tooltip component is built on top of the Reakit tooltip component.
// https://reakit.io/docs/tooltip
import React from "react";
import {
  Tooltip as ReakitTooltip,
  TooltipReference,
  useTooltipState,
  TooltipArrow,
} from "reakit/Tooltip";
import styled, { css } from "styled-components";
import theme from "../../theme";
import LinkStyles from "../Link/styles";

const TooltipContent = styled.div`
  font-size: 14px;
  max-width: 320px;
  color: white;
  padding: 8px 16px;
  line-height: 20px;
  font-weight: 500;
  border-radius: 12px;
  transform: scale(0.8);
  transition: transform 200ms;
  background: ${theme.colors.blue900};
  box-shadow: 0 0 0 1px rgba(136, 152, 170, 0.1),
    0 15px 50px 0 rgba(49, 49, 93, 0.1), 0 5px 20px 0 rgba(0, 0, 0, 0.08);

  ${LinkStyles} {
    color: ${theme.colors.blue[2]};
    &:hover {
      color: ${theme.colors.blue[1]};
    }
  }
`;

const interactableStyling = css`
  pointer-events: all !important;
`;

const openStyling = css`
  opacity: 1;
  visibility: visible;

  ${TooltipContent} {
    transform: scale(1);
  }
`;

// Because we are using custom component below e.g styled(ReakitTooltip) instead
// of styled.div, styled-components will pass all props through. This emits a
// warning for the interactable prop as it isn't a valid html prop. This simple
// wrapper component just extracts the prop and doesn't pass it to the
// underlying component.
// The only downside of this is that it breaks the styled-components 'as'
// prop
const ExtractedReakitTooltip = ({ interactable, ...props }) => (
  <ReakitTooltip {...props} />
);

const StyledTooltip = styled(ExtractedReakitTooltip)`
  opacity: 0;
  cursor: default;
  z-index: 999999;
  visibility: hidden;
  display: block !important;

  ${(props) => props.visible && openStyling};
  ${(props) => props.interactable && interactableStyling}
`;

const StyledTooltipArrow = styled(TooltipArrow)`
  fill: ${theme.colors.blue900};
`;

const Tooltip = ({
  children,
  content,
  gutter,
  interactable,
  placement = "bottom",
}) => {
  const tooltip = useTooltipState({
    gutter: gutter || 10,
    placement,
  });

  if (!content) return children;

  return (
    <>
      <TooltipReference {...tooltip} ref={children.ref} {...children.props}>
        {(referenceProps) => React.cloneElement(children, referenceProps)}
      </TooltipReference>
      <StyledTooltip interactable={interactable} {...tooltip}>
        <TooltipContent>
          <StyledTooltipArrow size={16} {...tooltip} />
          {content}
        </TooltipContent>
      </StyledTooltip>
    </>
  );
};

export default Tooltip;
