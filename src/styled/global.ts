import { css } from '@emotion/core';

interface ThemeProps {
  colors: {
    background: string;
    textColor: string;
  }
}

const globalStyles = (theme: ThemeProps) => css`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');

  html, body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.textColor};
    height: 100%;
    font-size: 16px;
    transition: background-color 0.4s ease, color 0.4s ease;
  }
`;

export default globalStyles;
