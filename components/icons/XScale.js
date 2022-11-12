import * as React from "react";
const SvgScale = (props) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <rect
      fill="none"
      height={416}
      rx={96}
      strokeLinejoin="round"
      strokeWidth={60}
      width={416}
      x={48}
      y={48}
    />
    <path
      d="M388.94 151.56c-24.46-22.28-68.72-51.4-132.94-51.4s-108.48 29.12-132.94 51.4a34.66 34.66 0 0 0-3.06 48.08l33.32 39.21a26.07 26.07 0 0 0 33.6 5.21c15.92-9.83 40.91-21.64 69.1-21.64s53.18 11.81 69.1 21.64a26.07 26.07 0 0 0 33.6-5.21L392 199.64a34.66 34.66 0 0 0-3.06-48.08Z"
      fill="none"
      strokeLinejoin="round"
      strokeWidth={60}
    />
  </svg>
);
export default SvgScale;
