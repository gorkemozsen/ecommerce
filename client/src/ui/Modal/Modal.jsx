import { IoCloseOutline } from "react-icons/io5";
import StyledModal from "./Modal.styles";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";

const ModalContext = createContext();

function Modal({ children, onIsModalOpen }) {
  const [openName, setOpenName] = useState("");

  function close() {
    setOpenName("");
    onIsModalOpen?.(false);
  }
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open, onIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open, onIsModalOpen } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
      onIsModalOpen?.(true);
    },
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  if (name !== openName) return null;

  return createPortal(
    <StyledModal.Overlay onClick={close}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledModal.Button onClick={close}>
          <IoCloseOutline />
        </StyledModal.Button>
        <StyledModal.Window>
          {cloneElement(children, { onCloseModal: close })}
        </StyledModal.Window>
      </StyledModal>
    </StyledModal.Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
