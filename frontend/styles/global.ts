import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Arial", sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    padding: 20px;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize.medium};
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background: ${({ theme }) => theme.colors.white};
    margin-bottom: ${({ theme }) => theme.spacing.small};
    padding: ${({ theme }) => theme.spacing.small};
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    border-left: 5px solid ${({ theme }) => theme.colors.primary};
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  input, select {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.small};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 5px;
    margin-bottom: ${({ theme }) => theme.spacing.small};
  }
`;

export default GlobalStyle;
