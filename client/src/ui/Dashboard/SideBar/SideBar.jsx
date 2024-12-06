import { IoMenu } from "react-icons/io5";
import StyledSideBar from "./SideBar.styles";
import { useState } from "react";
import Logo from "../../Logo/Logo";

import { AiOutlineProduct, AiOutlineShop } from "react-icons/ai";
import styled from "styled-components";
import Link from "../../Link";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";

const MenuIcon = styled.div`
  && {
    background-color: var(--color-white);

    box-shadow: var(--box-shadow-1);

    padding: 0.5rem;
    border-radius: 7px;
    & svg {
      font-size: 32px;
    }
  }
`;

const MenuLink = styled(Link)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
`;

function SideBar({ onMenuOpen, menuOpen }) {
  const [menuHover, setMenuHover] = useState();

  return (
    <StyledSideBar
      className={`${menuOpen ? "active" : ""} ${
        !menuOpen && menuHover ? "enter" : ""
      } `}
    >
      <div className="header">
        {(menuHover || menuOpen) && <Logo />}
        <button onClick={() => onMenuOpen((open) => !open)}>
          <IoMenu />
        </button>
      </div>
      <div
        className="nav"
        onClick={() => {
          !menuOpen && setMenuHover(false);
        }}
        onMouseEnter={() => {
          !menuOpen && setMenuHover(true);
        }}
        onMouseLeave={() => {
          !menuOpen && setMenuHover(false);
        }}
      >
        <MenuLink to="/dashboard" end>
          <MenuIcon>
            <MdOutlineDashboard />
          </MenuIcon>
          <span>Dashboard</span>
        </MenuLink>

        <MenuLink to="products">
          <MenuIcon>
            <AiOutlineProduct />
          </MenuIcon>
          <span>Products</span>
        </MenuLink>

        <MenuLink to="orders">
          <MenuIcon>
            <AiOutlineShop />
          </MenuIcon>
          <span>Orders</span>
        </MenuLink>

        <MenuLink to="categories">
          <MenuIcon>
            <MdOutlineCategory />
          </MenuIcon>
          <span>Categories</span>
        </MenuLink>
      </div>
    </StyledSideBar>
  );
}

export default SideBar;
