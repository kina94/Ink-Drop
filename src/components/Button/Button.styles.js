import styled, { css } from "styled-components";

export const Default = styled.button`
  all: unset;
  width: 100%;
  height: 100%;
  display: flex;
  cursor: pointer;
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  ${({ size, theme }) => {
    const buttonSize = size || "md";
    return {
      xs: `
      padding: 0.3rem 0; 
      `,
      sm: `
      padding: 0.6rem 0; 
      `,
      md: `
        padding: 0.9rem 0; 
      `,
      lg: `
        padding: 1.2rem 0;
      `,
    }[buttonSize];
  }};
  ${({ customStyle }) => {
    if (customStyle) {
      return css`
        ${customStyle}
      `;
    }
  }};
`;

export const Purple = styled(Default)`
  ${({ theme: { color }, disabled }) => {
    return css`
      color: white;
      background-color: var(--color-blue);
      &:hover {
        opacity: 0.9;
      }
      &:active {
        opacity: 0.8;
      }
    `;
  }}
`;

export const Pink = styled(Default)`
  ${({ theme: { color }, disabled }) => {
    return css`
      color: white;
      background-color: var(--color-hotpink);
      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.8;
      }
    `;
  }}
`;

export const Slate = styled(Default)`
  ${({ theme: { color }, disabled }) => {
    return css`
      color: white;
      background-color: slategray;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.8;
      }
    `;
  }}
`;
