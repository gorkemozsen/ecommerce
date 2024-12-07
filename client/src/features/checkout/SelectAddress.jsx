import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useUserAddress } from "../account/useUserAddress";
import { addAddressId } from "../cart/cartSlice";

import Spinner from "../../ui/Spinner";
import CartTotal from "../cart/CartTotal";
import Error from "../../ui/Error";
import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button";
import AddressForm from "../account/AddressForm";

const StyledSelectAddress = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    gap: 3rem;

    & h1 {
      margin-bottom: 2rem;
    }
  }
`;

const List = styled.ul`
  && {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
  }
`;

const Item = styled.li`
  && {
    background-color: var(--color-white-300);
    border: 1px solid var(--color-secondary);
    padding: 2rem;
    width: 100%;
    max-width: 400px;

    @media (min-width: 992px) {
      max-width: 100%;
    }

    transition: all 0.4s;

    &.selected {
      background-color: var(--color-secondary);
      color: var(--color-white);
    }

    & h3 {
      text-transform: uppercase;
    }
  }
`;

function SelectAddress() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { isPending: isLoadingAddress, data, error } = useUserAddress();
  const addressList = data?.addresses;

  const [selectedAddress, setSelectedAddress] = useState();

  useEffect(() => {
    setSelectedAddress(addressList?.find((address) => address?.isDefault).id);
  }, [addressList]);

  useEffect(() => {
    dispatch(addAddressId(selectedAddress));
  }, [selectedAddress, dispatch, cart]);

  if (isLoadingAddress) {
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );
  }

  return (
    <StyledSelectAddress className="row justify-content-center justify-content-lg-between">
      <div className="col-lg-6 col-12">
        <h1>Delivery Address</h1>

        {!addressList && (
          <>
            <p className="mb-5">You have no registered address.</p>
            <Modal>
              <Modal.Open opens="address-edit">
                <Button>Add new Address</Button>
              </Modal.Open>
              <Modal.Window name="address-edit">
                <AddressForm />
              </Modal.Window>
            </Modal>
          </>
        )}
        <List className="justify-content-center justify-content-lg-between">
          {addressList?.map((address) => (
            <Item
              onClick={() =>
                setSelectedAddress((prev) =>
                  prev !== address.id ? address.id : prev
                )
              }
              className={`${selectedAddress === address?.id ? "selected" : ""}`}
              key={address?.id}
            >
              <h3>{address.addressTitle}</h3>
              <p>{`${address.neighborhood}, ${address.street}, ${address.district}, ${address.city}`}</p>
            </Item>
          ))}
        </List>
      </div>

      <CartTotal isCheckout={true} className="col-lg-4 col-12" />
    </StyledSelectAddress>
  );
}

export default SelectAddress;
