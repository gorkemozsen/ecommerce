import styled from "styled-components";

const StyledError = styled.div`
  && {
    padding: 2rem;
    display: flex;
    justify-content: center;
    font-weight: 600;
  }
`;

function Error({ children }) {
  return <StyledError>{children}</StyledError>;
}

export default Error;
