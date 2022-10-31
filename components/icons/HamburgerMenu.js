import * as React from "react";
const SvgHamburgerMenu = (props) => (
  <svg
    height="1em"
    style={{
      enableBackground: "new 0 0 32 32",
    }}
    viewBox="0 0 32 32"
    width="2em"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
  >
    <path d="M4 10h24a2 2 0 0 0 0-4H4a2 2 0 0 0 0 4zm24 4H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4zm0 8H4a2 2 0 0 0 0 4h24a2 2 0 0 0 0-4z" />
  </svg>
);
export default SvgHamburgerMenu;
