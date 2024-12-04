import styled from "styled-components";
import { useUserAddress } from "./useUserAddress";
import Spinner from "../../ui/Spinner";
import AddressList from "../../ui/AddressList";
import AddressForm from "./AddressForm";
import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button";

const StyledUserAddresses = styled.div`
  && {
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

function UserAddresses() {
  const { isPending, data, error } = useUserAddress();

  console.log(error?.status);

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  return (
    <>
      <StyledUserAddresses>
        <Modal>
          <Modal.Open opens="address-edit">
            <Button>Add new Address</Button>
          </Modal.Open>
          <Modal.Window name="address-edit">
            <AddressForm />
          </Modal.Window>
        </Modal>
        {error && <p>{error.message}</p>}
        {!error && <AddressList addresses={data.addresses} />}
      </StyledUserAddresses>
    </>
  );
}

export default UserAddresses;