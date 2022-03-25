import {createGlobalStyle,css} from "styled-components";

export const GlobalStyles = createGlobalStyle`
${({ theme }) => css`
      ::placeholder{
         color:${theme.colors.themeText};
      }
      ::-webkit-input-placeholder{
         color:${theme.colors.themeText};
      }
      ::-moz-placeholder{
         color:${theme.colors.themeText};
      }
      body {
         background: ${theme.colors.background};
         color: ${theme.colors.body};
      }
      a{
         color: ${theme.colors.themeText};
      }
      a.active{
         color: ${theme.colors.primary};
      }
      .text-primary{
         color:${theme.colors.primary};
      }
      .text-dark{
         color:${theme.colors.dark};
      }
      .text-warning{
         color:${theme.colors.warning};
      }
      .text-error{
         color:${theme.colors.error};
      }
      .text-theme{
         color:${theme.colors.themeText};
      }
      .text-secondary{
         color:${theme.colors.secondary}
      }
      .text-body{
         color:${theme.colors.body}
      }
      .text-white{
         color:${theme.colors.white}
      }
      .text-transparent{
         color:${theme.colors.transparent}
      }
      .bg-transparent{
         background-color:${theme.colors.transparent}
      }
      .bg-primary{
         background-color:${theme.colors.primary};
      }
      .bg-dark{
         background-color:${theme.colors.dark};
      }
      .bg-warning{
         background-color:${theme.colors.warning};
      }
      .bg-error{
         background-color:${theme.colors.error};
      }
      .bg-theme{
         background-color:${theme.colors.themebg};
      }
      .bg-secondary{
         background-color:${theme.colors.secondary}
      }
      .bg-body{
         background-color:${theme.colors.body}
      }
      .bg-white{
         background-color:${theme.colors.white}
      }
      .form-control{
         border-bottom: 2px solid ${theme.colors.themeText};
      }
      .form-control:focus,.form-control:active,.form-control:focus-visible{
         border:1px solid ${theme.colors.themeText};
      }
      select.form-control, select option{
         color: ${theme.colors.themeText};
      }
      .borderTheme{
         border:1px solid ${theme.colors.themeText}
      }
      .border-none{
         border:none;
      }
   `}
`
