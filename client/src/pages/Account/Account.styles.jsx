import styled from "styled-components";

const StyledAccount = styled.section`
  && {
    padding: 0 4rem;
    flex-grow: 1;
    background-color: var(--color-white);

    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: 1fr 5fr;

      gap: 2.5rem;
    }
  }
`;

export default StyledAccount;
