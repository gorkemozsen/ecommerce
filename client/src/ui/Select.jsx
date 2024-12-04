import styled from "styled-components";

const StyledSelect = styled.select`
  && {
    border: none;
    background: none;
    border: 2px solid var(--color-white-600);

    padding: 1.2rem 1.8rem;

    &::placeholder {
      color: var(--color-white-t);
    }

    &:focus {
      outline: none;
      border-radius: 0;
    }
  }
`;

function Select({
  options,
  value,
  onChange,
  register,
  id,
  disabled,
  ...props
}) {
  return (
    <StyledSelect
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...register}
      {...props}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
