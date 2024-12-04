import styled from "styled-components";

const StyledFormRow = styled.div`
  && {
    margin-bottom: 3rem;
    position: relative;

    & input,
    textarea {
      width: 100%;

      @media (min-width: 992px) {
        width: 60%;
      }
    }
  }
`;

const Error = styled.span`
  && {
    top: 100%;
    display: block;
    position: absolute;
    color: red;
  }
`;

const Label = styled.label``;

function FormRow({ children, label, error }) {
  return (
    <StyledFormRow>
      <div className="d-block d-lg-flex align-items-center justify-content-between ">
        {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
        {children}
      </div>
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
