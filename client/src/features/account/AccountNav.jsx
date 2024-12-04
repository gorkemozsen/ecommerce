import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Seperator from "../../ui/Seperator";

const StyledAccountNav = styled.nav`
  && {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    height: fit-content;
    width: fit-content;
    padding: 1rem 2rem;

    background-color: var(--color-white-200);

    & div {
      width: max-content;
    }

    & div:hover {
      & .seperator {
        width: 100%;
      }
    }

    & .seperator {
      width: 20px;
      height: 2px;
      transition: all 0.4s;
    }

    @media (min-width: 992px) {
      margin-top: 4rem;

      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 2rem;
    }
  }
`;

const Link = styled(NavLink)`
  && {
    text-decoration: none;
    color: var(--color-black);
    padding: 1rem 0;
    transition: all 0.4s;

    &.active + .seperator {
      width: 100%;
      background-color: var(--color-secondary);
    }

    &:hover,
    &.active {
      color: var(--color-secondary);
    }
  }
`;

function AccountNav() {
  return (
    <StyledAccountNav>
      <div>
        <Link end to="">
          Account Information
        </Link>
        <Seperator $bg="var(--color-grey)" />
      </div>
      <div>
        <Link to="addresses">My Addresses</Link>
        <Seperator $bg="var(--color-grey)" />
      </div>
      <div>
        <Link to="orders">Order History</Link>
        <Seperator $bg="var(--color-grey)" />
      </div>
    </StyledAccountNav>
  );
}

export default AccountNav;
