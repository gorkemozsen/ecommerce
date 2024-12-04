import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Link = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;

  transition: all 0.3s;

  color: ${({ variant }) =>
    variant === "secondary" ? "var(--color-grey)" : "var(--color-black)"};

  &:hover,
  &.active {
    color: var(--color-secondary);
  }
`;

export default Link;
