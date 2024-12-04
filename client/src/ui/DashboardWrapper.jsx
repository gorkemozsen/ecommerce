import styled from "styled-components";

const StyledDashboardWrapper = styled.div`
  && {
    && {
      padding: 5rem;
      overflow: scroll;

      grid-column: 2 / -1;
      grid-row: 2 /-1;

      @media (max-width: 992px) {
        grid-column: 1 / -1;
      }

      & .wrapper {
        background-color: var(--color-white);

        border-radius: 20px;
        padding: 4rem;
        box-shadow: 0px 0px 16px 4px #0000000d;
      }
    }
  }
`;

function DashboardWrapper({ children }) {
  return (
    <StyledDashboardWrapper>
      <div className="wrapper">{children}</div>
    </StyledDashboardWrapper>
  );
}

export default DashboardWrapper;
