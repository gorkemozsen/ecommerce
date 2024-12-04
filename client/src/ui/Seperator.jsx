import styled from "styled-components";

const StyledSeperator = styled.div`
  width: 100%;
  height: 1px;

  /* background-color: var(--color-white-t); */
  ${({ $bg }) => `background-color: ${$bg}`}
`;

function Seperator(props) {
  return <StyledSeperator className="seperator" {...props} />;
}

export default Seperator;
