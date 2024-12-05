import SelectAddress from "../../features/checkout/SelectAddress";

import styled from "styled-components";

const StyledCheckout = styled.div`
  && {
    background-color: var(--color-white);
    padding: 0 6rem;
    flex-grow: 1;
  }
`;

function Checkout() {
  return (
    <StyledCheckout>
      <SelectAddress />
    </StyledCheckout>
  );
}

export default Checkout;
