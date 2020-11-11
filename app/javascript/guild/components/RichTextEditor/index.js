import React, { useState, useCallback, useRef } from "react";
import { Box, Button } from "@advisable/donut";
import { QuoteRight } from "@styled-icons/boxicons-solid";
import { ListOl, ListUl, Bold } from "@styled-icons/boxicons-regular";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateFromMarkdown } from "draft-js-import-markdown";
import { StyledMarkdown } from "../Markdown/styles";
import "draft-js/dist/Draft.css";

export default function RichTextEditor({ value, onChange }) {
  const editor = useRef(null);
  const [editorState, setEditorState] = useState(() => {
    if (!value) return EditorState.createEmpty();
    const contentState = stateFromMarkdown(value);
    return EditorState.createWithContent(contentState);
  });

  const handleKeyCommand = useCallback(
    (command, nextState) => {
      const newState = RichUtils.handleKeyCommand(nextState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    [setEditorState],
  );

  const mapKeyToEditorCommand = useCallback(
    (e) => {
      if (e.keyCode === 9) {
        const newEditorState = RichUtils.onTab(e, editorState, 4);
        if (newEditorState !== editorState) {
          setEditorState(newEditorState);
        }
        return null;
      }

      return getDefaultKeyBinding(e);
    },
    [editorState, setEditorState],
  );

  function toggleBlockType(blockType) {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  function toggleInlineStyle(inlineStyle) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  const handleChange = useCallback(
    (state) => {
      onChange(stateToMarkdown(state.getCurrentContent()));
      setEditorState(state);
    },
    [setEditorState, onChange],
  );

  const selection = editorState.getSelection();
  const currentStyle = editorState.getCurrentInlineStyle();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <StyledMarkdown>
      <Box
        height="60px"
        display="flex"
        alignItems="center"
        position="fixed"
        top="0"
        zIndex="100"
      >
        <Button
          size="xs"
          type="button"
          marginRight="2xs"
          variant={blockType === "header-one" ? "primary" : "subtle"}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("header-one");
          }}
        >
          H1
        </Button>
        <Button
          size="xs"
          type="button"
          marginRight="2xs"
          variant={blockType === "header-two" ? "primary" : "subtle"}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("header-two");
          }}
        >
          H2
        </Button>
        <Button
          size="xs"
          type="button"
          marginRight="2xs"
          variant={blockType === "header-three" ? "primary" : "subtle"}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("header-three");
          }}
        >
          H3
        </Button>
        <Button
          size="xs"
          type="button"
          marginRight="2xs"
          variant={blockType === "unordered-list-item" ? "primary" : "subtle"}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("unordered-list-item");
          }}
        >
          <ListUl />
        </Button>
        <Button
          size="xs"
          type="button"
          marginRight="2xs"
          variant={blockType === "ordered-list-item" ? "primary" : "subtle"}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("ordered-list-item");
          }}
        >
          <ListOl />
        </Button>
        <Button
          size="xs"
          type="button"
          marginRight="2xs"
          variant={blockType === "blockquote" ? "primary" : "subtle"}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlockType("blockquote");
          }}
        >
          <QuoteRight />
        </Button>
        <Button
          size="xs"
          type="button"
          variant={currentStyle.has("BOLD") ? "primary" : "subtle"}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle("BOLD");
          }}
        >
          <Bold />
        </Button>
      </Box>
      <Editor
        ref={editor}
        onChange={handleChange}
        editorState={editorState}
        placeholder="Write your post..."
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
      />
    </StyledMarkdown>
  );
}
