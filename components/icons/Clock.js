import * as React from 'react';
const SvgClock = (props) => (
  <svg
    style={{
      enableBackground: 'new 0 0 24 24',
    }}
    viewBox="0 0 24 24"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="black"
    {...props}
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
    <path d="M14 11.2V7c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 .5.2 1 .6 1.4l3 3c.4.4.9.6 1.4.6s1-.2 1.4-.6c.8-.8.8-2 0-2.8L14 11.2z" />
  </svg>
);
export default SvgClock;
