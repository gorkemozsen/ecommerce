import styled from "styled-components";
import AddressItem from "./AddressItem";

const StyledAddressList = styled.ul`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem 4rem;
    justify-content: center;

    @media (min-width: 992px) {
      justify-content: space-around;
    }
  }
`;

function AddressList({ addresses }) {
  return (
    <StyledAddressList>
      {addresses.map((address) => (
        <AddressItem key={address.id} address={address} />
      ))}
    </StyledAddressList>
  );
}

export default AddressList;
