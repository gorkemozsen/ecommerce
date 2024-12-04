import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useUserAddress } from "../account/useUserAddress";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import CartTotal from "../cart/CartTotal";
import { addAddressId } from "../cart/cartSlice";

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

  console.log(selectedAddress);

  useEffect(() => {
    setSelectedAddress(addressList?.find((address) => address?.isDefault).id);
  }, [addressList]);

  useEffect(() => {
    dispatch(addAddressId(selectedAddress));
    console.log(cart);
  }, [selectedAddress, dispatch, cart]);

  if (isLoadingAddress) {
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );
  }

  console.log(addressList);

  return (
    <StyledSelectAddress className="row justify-content-center justify-content-lg-between">
      <div className="col-lg-6 col-12">
        <h1>Delivery Address</h1>
        <List className="justify-content-center justify-content-lg-between">
          {addressList.map((address) => (
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
