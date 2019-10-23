// The tooltip component is built on top of the Reakit tooltip component.
// https://reakit.io/docs/tooltip
import React from "react";
import {
  Tooltip as ReakitTooltip,
  TooltipReference,
  useTooltipState,
} from "reakit/Tooltip";
import styled, { css } from "styled-components";
import theme from "../../theme";
import LinkStyles from "../Link/styles";

const StyledTooltipReference = styled(TooltipReference)`
  outline: none;
  cursor: default;
  display: inline-block;
`;

const TooltipContent = styled.div`
  color: white;
  font-size: 14px;
  max-width: 320px;
  padding: 12px 14px;
  line-height: 20px;
  border-radius: 12px;
  transform: scale(0.8);
  transition: transform 200ms;
  background: ${theme.colors.neutral[8]};
  box-shadow: 0 0 0 1px rgba(136, 152, 170, 0.1),
    0 15px 35px 0 rgba(49, 49, 93, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.08);

  ${LinkStyles} {
    color: ${theme.colors.blue[2]};
    &:hover {
      color: ${theme.colors.blue[1]};
    }
  }
`;

const PADDING = {
  "bottom-start": "10px 0 0 0",
  "bottom-end": "10px 0 0 0",
};

const TRANSFORM_ORIGIN = {
  "bottom-start": "10% 0",
  "bottom-end": "90% 0",
};

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

const animating = css`
  visibility: visible;
  transition: opacity 200ms;
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
  padding: ${props => PADDING[props.placement]};

  ${props => props.visible && openStyling};
  ${props => props.unstable_animating && animating};
  ${props => props.interactable && interactableStyling}

  ${TooltipContent} {
    transform-origin: ${props => TRANSFORM_ORIGIN[props.placement]};
  }
`;

const Tooltip = ({
  children,
  content,
  placement = "bottom-start",
  interactable,
}) => {
  const tooltip = useTooltipState({
    unstable_gutter: 0,
    unstable_animated: 200,
    placement,
  });

  if (!content) return children;

  return (
    <StyledTooltipReference {...tooltip}>
      {children}
      <StyledTooltip interactable={interactable} {...tooltip}>
        <TooltipContent>{content}</TooltipContent>
      </StyledTooltip>
    </StyledTooltipReference>
  );
};

export default Tooltip;
