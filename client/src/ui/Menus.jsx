import { useCallback, useEffect, useRef, useState } from "react";

import { SlOptionsVertical } from "react-icons/sl";
import styled from "styled-components";
import Button from "./Button";

const StyledMenus = styled.div``;

const StyledList = styled.div`
  && {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white-600);
    z-index: 1000;

    transform: translateX(-50%);
  }
`;

const RowButton = styled(Button)`
  && {
    @media (min-width: 992px) {
      border: none;
      background: none;
      color: var(--color-black);

      &:hover,
      &:active {
        background: none !important;
      }
    }
  }
`;

function List({ children, style, onClick, className }) {
  return (
    <StyledList className={className} onClick={onClick} style={style}>
      {children}
    </StyledList>
  );
}

function Menus({ children, onIsMenuOpen, isMenuOpen, isModalOpen }) {
  const [position, setPosition] = useState();
  const menuEl = useRef(null);

  const dashboard = document.querySelector(".dashboard");

  const handleClickOutside = useCallback(
    (event) => {
      if (menuEl.current && !menuEl.current.contains(event.target)) {
        onIsMenuOpen(false);
      }
    },
    [menuEl, onIsMenuOpen]
  );

  const handleScroll = useCallback(() => {
    onIsMenuOpen(false);
  }, [onIsMenuOpen]);

  useEffect(() => {
    isModalOpen && onIsMenuOpen(false);
  }, [isModalOpen, onIsMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      // Scroll olduğunda ve dışarıya tıklandığında menu kapanmalı
      document?.addEventListener("click", handleClickOutside);
      dashboard?.addEventListener("scroll", handleScroll);
    } else {
      document?.removeEventListener("click", handleClickOutside);
      dashboard?.removeEventListener("scroll", handleScroll);
    }

    return () => {
      document?.removeEventListener("click", handleClickOutside);
      dashboard?.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen, handleClickOutside, handleScroll, dashboard]);

  const handleClick = () => {
    if (!isMenuOpen && menuEl.current) {
      const rect = menuEl.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom,
        left: rect.left,
      });
    }
    onIsMenuOpen((open) => !open);
  };

  return (
    <>
      <RowButton ref={menuEl} onClick={handleClick}>
        <SlOptionsVertical className="d-none d-lg-block" />
      </RowButton>
      <StyledMenus>
        <List
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            top: position?.top,
            left: position?.left,
            display: isMenuOpen ? "flex" : "none",
          }}
        >
          {children}
        </List>
      </StyledMenus>
    </>
  );
}

export default Menus;
