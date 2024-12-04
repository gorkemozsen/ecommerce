import styled from "styled-components";

const StyledModal = styled.div`
  && {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-white);
    box-shadow: 0px 0px 15px 14px #0000000d;

    border-radius: 10px;
    padding: 3.2rem 4rem;

    @media (max-width: 992px) {
      width: 80vw;
    }
  }
`;
const Overlay = styled.div`
  && {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-white-t);
    backdrop-filter: blur(4px);

    z-index: 1000;
  }
`;
const Button = styled.button`
  border: none;
  background: none;
  font-size: var(--fs-h2);
  position: absolute;
  padding: 0.5rem;
  top: 0;
  right: 2rem;
`;

const Window = styled.div``;

StyledModal.Overlay = Overlay;
StyledModal.Button = Button;
StyledModal.Window = Window;

export default StyledModal;
