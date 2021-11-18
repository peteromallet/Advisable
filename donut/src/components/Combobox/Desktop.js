import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@advisable/donut";
import { createPopper } from "@popperjs/core";
import { ChevronDown } from "@styled-icons/ionicons-outline/ChevronDown";
import Input from "../Input";
import Menu from "./Menu";
import Tags from "./Tags";
import { StyledAutocomplete, StyledAutocompleteMenu } from "./styles";

export default function ComboboxDesktop({
  isOpen,
  containerProps,
  inputProps,
  menuProps,
  removeOption,
  close,
  ...props
}) {
  const popper = React.useRef(null);
  const inputConatinerRef = React.useRef(null);
  const listboxContainerRef = React.useRef(null);

  useEffect(() => {
    if (inputConatinerRef.current && listboxContainerRef.current) {
      popper.current = createPopper(
        inputConatinerRef.current,
        listboxContainerRef.current,
        {
          placement: "bottom",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ],
        },
      );

      const instance = popper.current;
      return () => instance.destroy();
    }
  }, [isOpen]);

  useEffect(() => {
    if (popper.current) {
      popper.current.update();
    }
  }, [menuProps]);

  useEffect(() => {
    const handleClick = (e) => {
      const container = listboxContainerRef.current;
      if (!container) return;
      if (!container.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [close]);

  return (
    <StyledAutocomplete {...containerProps}>
      <div ref={inputConatinerRef}>
        <Input {...inputProps()} suffix={<ChevronDown />} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <Box
            zIndex={999}
            width="100%"
            position="absolute"
            ref={listboxContainerRef}
          >
            <StyledAutocompleteMenu
              as={motion.div}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <Menu {...menuProps} />
            </StyledAutocompleteMenu>
          </Box>
        )}
      </AnimatePresence>

      {props.multiple && props.value.length > 0 && (
        <Tags value={props.value} removeOption={removeOption} />
      )}
    </StyledAutocomplete>
  );
}
