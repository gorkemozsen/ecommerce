import styled, { css } from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../features/authentication/useUser";
import { useLogout } from "../../features/authentication/useLogout";

import { FaCartArrowDown, FaPhone } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import StyledHeader from "./Header.styles";
import Link from "../Link";
import Logo from "../Logo/Logo";
import Button from "../Button";
import CartDropdown from "../CartDropdown";

const TopBar = styled.nav`
  && {
    padding: 1.5rem 4rem;

    background-color: var(--color-primary);
    color: var(--color-grey);
    font-size: var(--fs-xsmall);
    text-transform: uppercase;

    & .links {
      & a {
        color: var(--color-grey);

        &:not(:last-child) {
          margin-right: 1.5rem;
        }
      }
    }
  }
`;
const NavBar = styled.nav`
  && {
    background-color: var(--color-white);
    padding: 2.5rem 4rem;
    position: relative;

    & .menu {
      z-index: 2;
      @media (max-width: 768px) {
        background-color: var(--color-white);

        position: fixed;
        top: 0;
        left: -50%;
        bottom: 0;
        width: 0;

        overflow: hidden;

        flex-direction: column;
        padding: 4rem;

        transition: all 0.5s;

        ${({ $active }) =>
          $active &&
          css`
            width: 40%;
            left: 0;
          `}
      }
    }
  }
`;

const Background = styled.div`
  && {
    position: fixed;
    background-color: red;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);

    z-index: -1;
    opacity: 0;
    transition: all 0.5s;

    ${({ $active }) =>
      $active &&
      css`
        z-index: 1;
        opacity: 1;
      `}
  }
`;

const ToggleButton = styled.button`
  && {
    border: none;
    background: none;
    font-size: var(--fs-small);
    text-transform: uppercase;

    padding: 0.5rem;
    background-color: var(--color-primary);
    color: var(--color-white);

    & svg {
      font-size: 30px;
    }
  }
`;

function Header() {
  const { error } = useUser();
  const { logout, isPending } = useLogout();

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const cart = useSelector((state) => state.cart);

  return (
    <StyledHeader className="">
      <TopBar className="d-none justify-content-between d-md-flex">
        <div className="phone">
          <a>
            <FaPhone /> 123 456 789 00
          </a>
        </div>

        <div className="links">
          {!error ? (
            <>
              <Link to="account">Account</Link>
              <Link onClick={logout}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </TopBar>

      <NavBar
        $active={isOpen}
        className="d-flex align-items-center justify-content-between"
      >
        <Link to="/">
          <Logo className="col-3" />
        </Link>

        <div className="nav-menu d-flex align-items-center justify-content-between gap-3">
          <div className="menu d-flex gap-5 mx-md-5">
            <Link>About Us</Link>
            <Link>Contact</Link>
          </div>

          <div>
            <Button
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
              onClick={() => {
                navigate("/cart");
                setIsCartOpen(false);
              }}
              $variant="cart"
            >
              <FaCartArrowDown />
              Cart
              <span>{cart?.items?.length}</span>
            </Button>

            <CartDropdown
              isCartOpen={isCartOpen}
              onIsCartOpen={setIsCartOpen}
            />
          </div>
          <ToggleButton
            onClick={() => {
              setIsOpen((open) => !open);
              document.body.style.overflow = "hidden";
            }}
            className="d-md-none d-block"
          >
            <IoMenu /> Menu
          </ToggleButton>
        </div>
      </NavBar>

      <Background
        onClick={() => {
          setIsOpen((open) => !open);
          document.body.style.overflow = "auto";
        }}
        $active={isOpen}
      />
    </StyledHeader>
  );
}

export default Header;
