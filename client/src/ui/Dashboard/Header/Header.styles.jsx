import styled from "styled-components";

const StyledHeader = styled.header`
  && {
    grid-column: 2 / -1;
    grid-row: 1 / span 1;
    background-color: var(--color-white);

    padding: 4rem;

    box-shadow: 11px 3px 16px #0000000d;

    & .user {
      display: flex;
      gap: 0.5rem;
    }

    & form {
      & label {
        font-size: 40px;
        display: flex;
        align-items: center;
      }

      & input {
        border: none;
        background: none;
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
        font-size: var(--fs-medium);
        width: 150%;

        &::placeholder {
          font-size: var(--fs-medium);
        }

        &:focus {
          outline: none;
        }
      }
    }
  }
`;

export default StyledHeader;
