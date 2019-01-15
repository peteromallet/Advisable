import React from 'react';
import { ModalBody } from "./styles";

// The modal body provides as component that will scroll when filled with
// that is greater than the screen height. 
export default ({ children }) => {
  return (
    <ModalBody>
      {/*
        The children are intentially wrapped in a div to break out the
        ModalBody flex layout.
      */}
      <div>
        {children}
      </div>
    </ModalBody>
  )
}
