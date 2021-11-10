import React, { useState, useCallback, useRef } from "react";
import { ListOl } from "@styled-icons/boxicons-regular/ListOl";
import { ListUl } from "@styled-icons/boxicons-regular/ListUl";
import { Bold } from "@styled-icons/boxicons-regular/Bold";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { stateToMarkdown } from "draft-js-export-markdown";
import { stateFromMarkdown } from "draft-js-import-markdown";
import { StyledMarkdown } from "../Markdown/styles";
import { StyledEditor, StyledToolbar, StyledToolbarButton } from "./styles";
import "draft-js/dist/Draft.css";

export default function RichTextEditor({ value, onChange, onBlur }) {
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
      const binding = getDefaultKeyBinding(e);

      // ignore bindings that arent supported by react markdown
      return /italic|underline/.test(binding) ? null : binding;
    },
    [editorState, setEditorState],
  );

  function toggleBlockType(blockType) {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  function toggleInlineStyle(inlineStyle) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  function blockStyleFunction(content) {
    const type = content.getType();

    if (type === "unstyled") {
      return "paragraph";
    }
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

  const focusEditor = () => {
    if (document.activeElement !== editor.current?.editor) {
      editor.current?.focus();
    }
  };

  return (
    <StyledMarkdown onClick={focusEditor}>
      <StyledToolbar>
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
          $active={currentStyle.has("BOLD")}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle("BOLD");
          }}
        >
          <Bold />
        </StyledToolbarButton>
      </StyledToolbar>
      <StyledEditor>
        <Editor
          ref={editor}
          stripPastedStyles
          onChange={handleChange}
          onBlur={onBlur}
          editorState={editorState}
          placeholder="Write your post..."
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          blockStyleFn={blockStyleFunction}
        />
      </StyledEditor>
    </StyledMarkdown>
  );
}
