import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formatToTwoDecimal } from "../../hooks/formattoTwoDecimal";
import { useUser } from "../authentication/useUser";
import { useCreateOrder } from "../order/useCreateOrder";

import Seperator from "../../ui/Seperator";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal/Modal";
import Confirm from "../../ui/Confirm";

const StyledCartTotal = styled.div`
  && {
    height: 300px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 50vw;
    min-width: 300px;

    background-color: var(--color-white-600);

    & h2 {
      font-size: var(--fs-h2);
    }
  }
`;

const TotalRow = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    & p {
      color: var(--color-grey);
    }

    & span {
      font-weight: 600;
    }

    &:last-child span {
      font-size: var(--fs-h4);
    }
  }
`;

function CartTotal({ isCheckout, addressId, ...props }) {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { createOrder, isPending } = useCreateOrder();

  const { error } = useUser();

  function handleCreateOrder() {
    if (error) navigate("/login");
    createOrder(cart);
  }

  return (
    <StyledCartTotal {...props}>
      <h2>Cart totals</h2>

      <Seperator $bg="var(--color-white-500)" />

      <TotalRow>
        <p>Subtotal:</p>
        <span>$ {formatToTwoDecimal(totalPrice)}</span>
      </TotalRow>

      <TotalRow>
        <p>Total:</p> <span>$ {formatToTwoDecimal(totalPrice)}</span>
      </TotalRow>

      {cart.items.length ? (
        !isCheckout ? (
          <Button onClick={() => navigate("/checkout")}>Checkout</Button>
        ) : (
          <Modal>
            <Modal.Open opens="product-form">
              <Button disabled={isPending}>Create Order</Button>
            </Modal.Open>
            <Modal.Window name="product-form">
              <Confirm
                onConfirm={handleCreateOrder}
                operation="Create"
                disabled={isPending}
                title="Create Order"
                description={`Are you sure want to create this order?  Total Price: $ ${formatToTwoDecimal(
                  totalPrice
                )}`}
              />
            </Modal.Window>
          </Modal>
        )
      ) : (
        <></>
      )}
    </StyledCartTotal>
  );
}

export default CartTotal;
