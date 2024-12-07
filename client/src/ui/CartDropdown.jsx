import styled from "styled-components";
import CartItem from "./CartItem";
import Seperator from "./Seperator";
import Button from "./Button";
import { useSelector } from "react-redux";
import { formatToTwoDecimal } from "../hooks/formattoTwoDecimal";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

const StyledCartDropdown = styled.div`
  && {
    position: absolute;
    top: 60%;
    right: 3%;

    padding: 2rem;
    z-index: 999999;

    & .wrapper {
      background-color: var(--color-white);
      padding: 2rem;
      width: 300px;
      box-shadow: 0px 0px 16px 4px #0000000d;

      & .items {
        overflow-y: scroll;
        max-height: 300px;

        &::-webkit-scrollbar {
          background: var(--color-white-bg);
          border-radius: 10px;
          width: 4px;
        }
        &::-webkit-scrollbar-thumb {
          background: var(--color-secondary);
          border-radius: 10px;
        }
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: 5px;
      right: 30px;
      width: 0;
      height: 0;
      border-left: 17px solid transparent;
      border-right: 17px solid transparent;
      border-bottom: 15px solid var(--color-white);
    }
  }
`;

const Header = styled.div`
  && {
    & p {
      color: var(--color-grey);
      font-weight: 400;
      text-align: end;
      margin-bottom: 0.5rem;
      padding: 0 1.5rem;

      & span {
        color: var(--color-black);
        font-weight: 500;
        margin-left: 1rem;
      }
    }
  }
`;

const Buttons = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 1.5rem 0 2rem;
  }
`;

function CartDropdown({ onIsCartOpen, isCartOpen }) {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  if (!isCartOpen) return null;

  return (
    <StyledCartDropdown
      className="d-md-block d-none"
      onMouseEnter={() => onIsCartOpen(true)}
      onMouseLeave={() => onIsCartOpen(false)}
    >
      <div className="wrapper">
        <Header>
          <p>
            Subtotal: <span>$ {formatToTwoDecimal(cart.totalPrice)}</span>
          </p>
        </Header>

        <div className="items">
          {cart.items.length === 0 && (
            <Error>
              <p>No items in your cart...</p>
            </Error>
          )}

          {cart?.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <Seperator $bg="var(--color-white-600)" />

        <Buttons>
          <Button
            onClick={() => {
              navigate("/cart");
              onIsCartOpen(false);
            }}
          >
            VIEW CART
          </Button>
        </Buttons>
      </div>
    </StyledCartDropdown>
  );
}

export default CartDropdown;
