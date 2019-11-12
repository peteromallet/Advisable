import React from "react";
import { useSpring } from "react-spring";
import { Icon } from "@advisable/donut";
import Item from "./Item";
import {
  NavButton,
  StyledSideScroller,
  StyledSideScrollerInner,
} from "./styles";

const SideScroller = ({ children }) => {
  const timer = React.useRef(null);
  const scroller = React.useRef(null);
  const [cardWidth, setCardWidth] = React.useState(0);
  const [canPrevious, setCanPrevious] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [_, setScroll] = useSpring(() => ({ scroll: 0 }));

  const handleScroll = React.useCallback(
    e => {
      if (!scroller.current) return;
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setCurrent(Math.ceil(scroller.current.scrollLeft / cardWidth));
      }, 200);
    },
    [cardWidth]
  );

  const handleNext = () => {
    setCurrent(current + 1);
    setScroll({
      scroll: cardWidth * (current + 1),
      reset: true,
      from: { scroll: scroller.current.scrollLeft },
      onFrame: props => (scroller.current.scrollLeft = props.scroll),
    });
  };

  const handlePrevious = () => {
    if (current === 0) return;
    setCurrent(current - 1);
    setScroll({
      scroll: cardWidth * (current - 1),
      reset: true,
      from: { scroll: scroller.current.scrollLeft },
      onFrame: props => (scroller.current.scrollLeft = props.scroll),
    });
  };

  return (
    <>
      <StyledSideScroller>
        {canPrevious && (
          <NavButton css="left: 16px;" onClick={handlePrevious}>
            <Icon icon="chevron-left" />
          </NavButton>
        )}
        {canNext && (
          <NavButton css="right: 16px;" onClick={handleNext}>
            <Icon icon="chevron-right" />
          </NavButton>
        )}
        <StyledSideScrollerInner
          ref={scroller}
          count={React.Children.count(children)}
          onScroll={handleScroll}
        >
          {React.Children.map(children, (child, i) => (
            <Item
              key={i}
              scroller={scroller}
              setCardWidth={setCardWidth}
              onVisible={() => {
                if (i === 0) {
                  setCanPrevious(false);
                }

                if (i === React.Children.count(children) - 1) {
                  setCanNext(false);
                }
              }}
              onHidden={() => {
                if (i === 0) {
                  setCanPrevious(true);
                }

                if (i === React.Children.count(children) - 1) {
                  setCanNext(true);
                }
              }}
            >
              {React.cloneElement(child)}
            </Item>
          ))}
        </StyledSideScrollerInner>
      </StyledSideScroller>
    </>
  );
};

export default SideScroller;
