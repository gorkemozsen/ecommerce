import styled from "styled-components";

const StyledSideBar = styled.nav`
  && {
    grid-row: 1 / span -1;

    width: 100px;
    position: sticky;

    z-index: 1;

    transition: all 0.5s;

    @media (max-width: 992px) {
      width: 0;
    }

    & .header {
      height: 80px;
      background-color: var(--color-white);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 4rem;
      width: 100px;

      transition: all 0.5s;

      & img {
        height: 50px;
        height: 50px;
      }

      & button {
        border: none;
        background: none;

        & svg {
          font-size: 30px;
        }
      }
    }

    & .nav {
      padding: 2rem 0;
      height: 100vh;
      overflow-y: scroll;
      box-shadow: 11px 3px 16px #0000000d;
      background-color: var(--color-white-300);

      display: flex;
      flex-direction: column;
      align-items: center;

      & a {
        text-transform: none;
      }

      gap: 3rem;

      @media (max-width: 992px) {
        opacity: 0;
      }

      & span {
        display: none;
      }

      transition: all 0.4s;
    }

    &.active {
      width: 300px;
      position: sticky;
      top: 0;

      @media (max-width: 992px) {
        position: absolute;
      }

      & .header {
        justify-content: space-between;
        width: 100%;
      }

      & .nav {
        padding: 2rem 4rem;
        opacity: 1;
        align-items: start;

        & span {
          display: block;
        }
      }
    }

    &.enter {
      left: 0;
      bottom: 0;
      width: 300px;

      & .header {
        justify-content: space-between;
        width: 300px;
      }

      & .nav {
        padding: 2rem 4rem;
        opacity: 1;
        align-items: start;

        & span {
          display: block;
        }
      }
    }
  }
`;

export default StyledSideBar;
