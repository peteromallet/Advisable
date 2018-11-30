import React from 'react';
import EmptyState from 'src/components/EmptyState';

export default ({ children }) => (
  <div>
    <EmptyState
      icon='compass'
      heading="404"
      text={ children || "Page not found" }
    />
  </div>
)
