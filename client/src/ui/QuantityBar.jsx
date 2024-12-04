import styled from "styled-components";

const StyledQuantityBar = styled.form`
  && {
    display: flex;

    padding: 0.5rem;
    & button,
    & input {
      padding: 0.2rem;
      border: none;
      background: none;
      border: 1px solid var(--color-white-500);
    }

    & input {
      width: 30px;
      text-align: center;
    }

    & button:first-child {
      border-right: none;
    }

    & button:last-child {
      border-left: none;
    }

    & input,
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
      -moz-appearance: textfield;
    }
  }
`;

function QuantityBar({ onButtonClick, currentQuantity, onInputChange }) {
  return (
    <StyledQuantityBar>
      <button onClick={(e) => onButtonClick(e, -1)}>-</button>
      <input
        type="number"
        value={currentQuantity}
        onChange={onInputChange}
        onClick={(e) => {
          e.target.select();
        }}
      />
      <button onClick={(e) => onButtonClick(e, 1)}>+</button>
    </StyledQuantityBar>
  );
}

export default QuantityBar;
