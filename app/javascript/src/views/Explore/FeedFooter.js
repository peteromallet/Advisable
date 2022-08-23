import React from 'react';

export default function FeedFooter({ children }) {
  return (
    <div className="py-10 text-center text-neutral-600">
      <h5>{children}</h5>
    </div>
  )
}
