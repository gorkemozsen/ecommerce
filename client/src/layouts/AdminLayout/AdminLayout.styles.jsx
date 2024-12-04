import styled from "styled-components";

const StyledAdminLayout = styled.main`
  && {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 80px 1fr;

    grid-template-areas: "header  header" "sidebar  dashboard";

    height: 100vh;
    overflow: hidden;

    transition: all 0.5s;

    &.active {
      grid-template-columns: 300px 1fr;
    }
  }
`;

export default StyledAdminLayout;
