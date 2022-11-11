import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
      :root {
          --text-primary: #08428C;
          --text-secondary:#6393A6;
          --background-primary: #F2AEBB;
          --background-secondary:#F2CBBD;
          --background-secondary-blur: rgba(242, 203, 189, 0.1);
          --not-black:#323E40;
          --not-white:#F2F2F2;
          --background-hover: #4B4952;

          --iconSize:4rem;
          --form-fontSize:2rem;

          
          --shadow-color: 341deg 7% 56%;
          --shadow-elevation:
          0.6px 0.5px 0.9px hsl(var(--shadow-color) / 0.36),
          1.8px 1.6px 2.7px -0.8px hsl(var(--shadow-color) / 0.36),
          4.5px 4.1px 6.8px -1.7px hsl(var(--shadow-color) / 0.36),
          11px 9.9px 16.6px -2.5px hsl(var(--shadow-color) / 0.36);

          --shadow-elevation-intens:
          0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
          1.5px 2.9px 3.7px -0.4px hsl(var(--shadow-color) / 0.34),
          2.7px 5.4px 6.8px -0.7px hsl(var(--shadow-color) / 0.34),
          4.5px 8.9px 11.2px -1.1px hsl(var(--shadow-color) / 0.34),
          7.1px 14.3px 18px -1.4px hsl(var(--shadow-color) / 0.34),
          11.2px 22.3px 28.1px -1.8px hsl(var(--shadow-color) / 0.34),
          17px 33.9px 42.7px -2.1px hsl(var(--shadow-color) / 0.34),
          25px 50px 62.9px -2.5px hsl(var(--shadow-color) / 0.34);
      }

      /* noto-sans-regular - latin */
    @font-face {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 400;
    src: local(''),
       url('/fonts/noto-sans-v27-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('/fonts/noto-sans-v27-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
  
      * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
      }
  
      body {
          font-family: 'Noto Sans', sans-serif;
          background-color: var(--background-primary);
          color: var(--text-primary);
      }

      ul, ol{
        list-style:none;
      }
  `;

export default GlobalStyle;
