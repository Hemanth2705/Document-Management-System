import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily.base};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding: ${({ theme }) => theme.space.large};
    display: flex;
    justify-content: center;
  }

  .container {
    max-width: 800px;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.space.large};
    border-radius: ${({ theme }) => theme.radius.default};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.large};
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.space.large};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1::before {
    content: "📁";
    font-size: 28px;
    margin-right: 10px;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.space.medium};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    padding-bottom: 5px;
  }

  /* Forms */
  form {
    background: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.space.medium};
    border-radius: ${({ theme }) => theme.radius.default};
    box-shadow: ${({ theme }) => theme.shadow.subtle};
    margin-top: ${({ theme }) => theme.space.small};
  }

  input, select {
    width: 100%;
    padding: ${({ theme }) => theme.space.small};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.default};
    margin-bottom: ${({ theme }) => theme.space.small};
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: ${({ theme }) => theme.space.small};
    border-radius: ${({ theme }) => theme.radius.default};
    cursor: pointer;
    transition: background 0.3s;
    width: 100%;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default GlobalStyle;
