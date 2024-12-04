import styled, { css } from "styled-components";

const secondary = css`
  background-color: transparent;
  border: 2px solid var(--color-secondary);
  &:hover {
    background-color: var(--color-secondary);
  }
`;

const cart = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  letter-spacing: 0;

  & .cart-count {
    display: flex;
    align-items: center;
    width: 24px;
    height: 24px;
    border: 1px solid var(--color-white-t);
    padding: 0.3rem 0.8rem;
    font-size: var(--fs-small);
    & span {
      position: absolute;
      text-align: center;
    }
  }
`;

const Button = styled.button`
  && {
    border: none;
    background: none;
    letter-spacing: 0.3rem;

    padding: 1.2rem 1.8rem;

    background-color: var(--color-secondary);
    color: var(--color-white);

    text-transform: uppercase;

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
      `}

    transition: all 0.4s;

    &:hover {
      background-color: var(--color-secondary-500);
    }

    ${({ $color }) =>
      css`
        background-color: ${$color?.bg};
        color: ${$color?.color};
        &:hover {
          background-color: ${$color?.hover};
        }
      `}

    ${({ $variant }) => $variant === "secondary" && secondary}
    ${({ $variant }) => $variant === "cart" && cart}
  }
`;

export default Button;
