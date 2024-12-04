import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
/* COLORS */

  /* Primary */
  --color-primary-100: #5A331F; 
  --color-primary-200: #734A35; 
  --color-primary-300: #8C6150; 
  --color-primary: #42200A; 
  --color-primary-500: #371B08; 
  --color-primary-600: #2C1607; 
  --color-primary-700: #211104; 

  /* Secondary */
  --color-secondary-100: #6BB8B3; 
  --color-secondary-200: #81C7C5; 
  --color-secondary-300: #97D6D6; 
  --color-secondary: #55A9A2; 
  --color-secondary-500: #4B8F89; 
  --color-secondary-600: #417570; 
  --color-secondary-700: #375C58; 


  /* White */
  --color-white: #ffffff; 
  --color-white-200: #f2f2f2; 
  --color-white-300: #efefef; 
  --color-white-400: #d9d9d9; 
  --color-white-500: #cccccc; 
  --color-white-600: #f5f5f5f5; 
  --color-white-bg: #F6F6F6F6; 
  --color-white-t: rgba(255, 255, 255, 0.5); 

  /* Black) */
  --color-black-100: #333333; 
  --color-black-200: #4d4d4d; 
  --color-black-300: #666666; 
  --color-black: #000000; 


  /* Grey */
  --color-grey: #999999;

    /* Red */
    --color-red: #DB1A1A;

/* FONT */
  /* SIZES */
    /* HEADING */
    --fs-h1: 4.8rem;
    --fs-h2: 3.6rem;
    --fs-h3: 3rem;
    --fs-h4: 2.4rem;
    --fs-h5: 2rem;
    --fs-h6: 1.8rem;

    /* PARAGRAPH */
    --fs-large: 1.6rem; 
    --fs-medium: 1.4rem; 
    --fs-small: 1.2rem; 
    --fs-xsmall: 1rem; 
  
  /* FAMILY */
  --font-primary: 'Poppins', sans-serif;
  --font-secondary: 'Playfair Display', serif;
  
  
 --box-shadow-1: 0px 0px 16px 4px #0000000d;

  

  *,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}}

html {
  font-size: 62.5%;
  overflow-y: scroll;


@media (max-width: 992px) {
  font-size: 50%;
}
  
}

body {
 font-family : 'Poppins', sans-serif ;
 font-size: 1.6rem;
 background-color: var(--color-white-bg);

}

ul{
  list-style: none;

}
`;

export default GlobalStyles;
