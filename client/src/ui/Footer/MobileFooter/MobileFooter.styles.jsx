import styled from "styled-components";

const StyledMobileFooter = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;
  gap: 1rem;

  margin: 0 auto;

  & div {
    background-color: var(--color-secondary);
    width: 100%;
    padding: 0.5rem;

    text-align: center;

    & svg {
      font-size: 40px;
      color: white;
    }
  }
`;

export default StyledMobileFooter;
