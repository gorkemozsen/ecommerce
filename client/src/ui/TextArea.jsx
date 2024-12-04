import styled, { css } from "styled-components";

const TextArea = styled.textarea`
  && {
    border: none;
    background: none;
    border: 2px solid var(--color-white-600);

    padding: 1.2rem 1.8rem;

    -webkit-resize: none; /* Safari ve eski WebKit tarayıcıları için */
    -moz-resize: none; /* Eski Firefox için */
    resize: none;
    overflow: "auto";
    height: 100px;

    &::placeholder {
      color: var(--color-white-t);
    }

    &:focus {
      outline: none;
      border-radius: 0;
    }

    ${({ $bg }) =>
      $bg === "white" &&
      css`
        border: 1px solid var(--color-white-300);
        background: var(--color-white);
        caret-color: var(--color-secondary);

        &:focus {
          outline: 2px solid var(--color-secondary);
        }
      `}
  }
`;

export default TextArea;
