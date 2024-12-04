import styled from "styled-components";
import Button from "./Button";

const StyledConfirm = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const ButtonBox = styled.div`
  && {
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
  }
`;

function Confirm({
  operation,
  title,
  description,
  onConfirm,
  disabled,
  onCloseModal,
}) {
  async function handleConfirm() {
    try {
      await onConfirm?.();
      onCloseModal?.();
    } catch (error) {
      throw new Error(`${operation} failed`);
    }
  }

  return (
    <div>
      <StyledConfirm>
        <h3>{title}</h3>
        <p>{description}</p>

        <ButtonBox>
          <Button disabled={disabled} onClick={onCloseModal}>
            Cancel
          </Button>
          <Button disabled={disabled} onClick={handleConfirm}>
            {operation}
          </Button>
        </ButtonBox>
      </StyledConfirm>
    </div>
  );
}

export default Confirm;
