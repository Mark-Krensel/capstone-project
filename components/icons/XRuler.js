import * as React from "react";
const SvgRuler2 = (props) => (
  <svg
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <rect
      fill="none"
      height={100}
      rx={8}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={30}
      transform="rotate(-45 128.01 127.977)"
      width={220}
      x={15}
      y={82.7}
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
      d="m132 60 32 32M96 96l32 32M60 132l32 32"
    />
  </svg>
);
export default SvgRuler2;
