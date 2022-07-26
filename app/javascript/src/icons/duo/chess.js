import React from "react";

export default function ChessIcon({
  stroke = "rgb(0 0 0)",
  fill = "rgb(0 0 0 / 24)",
  ...props
}) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#fff"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M12.232 4.319c-.048-1.064-.427-2.096-.705-2.605l-.099.058c-.828.482-2.685 1.563-4.162 3.078-1.031.803-1.852 2.136-1.852 3.738 0 1.238.472 2.232.92 3.173.826 1.742 1.568 3.304-.92 5.896 3.278.639 9.649 1.584 9.877.498.43-2.052.046-3.195-.245-4.06-.167-.495-.303-.899-.238-1.33 1.988.754 3.317-.964 3.998-1.842.098-.127.182-.236.253-.317-.89-1.344-2.592-3.445-3.768-4.655-.85-.875-1.932-1.366-3.06-1.632z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M15.502 12.952c-1.042-.247-1.645-.562-2.479-1.011"
      ></path>
      <path
        fill={fill}
        stroke={stroke}
        strokeLinejoin="round"
        strokeWidth="1.714"
        d="M3.604 19.88c-.1.788-.174 1.59-.174 2.406h14.818c0-.815-.074-1.618-.174-2.405-.207-1.634-1.579-2.909-3.22-3.05-1.305-.112-2.646-.21-4.015-.21-1.368 0-2.71.098-4.015.21-1.641.141-3.013 1.416-3.22 3.05z"
      ></path>
    </svg>
  )
}
