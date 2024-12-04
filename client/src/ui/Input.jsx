import styled, { css } from "styled-components";

const Input = styled.input`
  && {
    border: none;
    background: none;
    border: 2px solid var(--color-white-600);

    padding: 1.2rem 1.8rem;

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

export default Input;
