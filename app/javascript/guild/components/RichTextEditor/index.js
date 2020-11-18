import React, { useState, useCallback, useRef } from "react";
import Sticky from "components/Sticky";
import { QuoteRight } from "@styled-icons/boxicons-solid";
import { ListOl, ListUl, Bold } from "@styled-icons/boxicons-regular";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateFromMarkdown } from "draft-js-import-markdown";
import { StyledMarkdown } from "../Markdown/styles";
import { StyledEditor, StyledToolbar, StyledToolbarButton } from "./styles";
import "draft-js/dist/Draft.css";

export default function RichTextEditor({ value, onChange }) {
  const editor = useRef(null);
  const [focused, setFocused] = useState(false);
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
      <Sticky enabled zIndex={100} offset={-51}>
        <StyledToolbar>
          <StyledToolbarButton
            size="xs"
            type="button"
            marginRight="2xs"
            $active={blockType === "header-one"}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType("header-one");
            }}
          >
            H1
          </StyledToolbarButton>
          <StyledToolbarButton
            size="xs"
            type="button"
            marginRight="2xs"
            $active={blockType === "header-two"}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType("header-two");
            }}
          >
            H2
          </StyledToolbarButton>
          <StyledToolbarButton
            size="xs"
            type="button"
            marginRight="2xs"
            $active={blockType === "header-three"}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType("header-three");
            }}
          >
            H3
          </StyledToolbarButton>
          <StyledToolbarButton
            size="xs"
            type="button"
            marginRight="2xs"
            $active={blockType === "unordered-list-item"}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType("unordered-list-item");
            }}
          >
            <ListUl />
          </StyledToolbarButton>
          <StyledToolbarButton
            size="xs"
            type="button"
            marginRight="2xs"
            $active={blockType === "ordered-list-item"}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType("ordered-list-item");
            }}
          >
            <ListOl />
          </StyledToolbarButton>
          <StyledToolbarButton
            size="xs"
            type="button"
            marginRight="2xs"
            $active={blockType === "blockquote"}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlockType("blockquote");
            }}
          >
            <QuoteRight />
          </StyledToolbarButton>
          <StyledToolbarButton
            size="xs"
            type="button"
            $active={currentStyle.has("BOLD")}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleInlineStyle("BOLD");
            }}
          >
            <Bold />
          </StyledToolbarButton>
        </StyledToolbar>
      </Sticky>
      <StyledEditor>
        <Editor
          ref={editor}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={handleChange}
          editorState={editorState}
          placeholder="Write your post..."
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
        />
      </StyledEditor>
    </StyledMarkdown>
  );
}
