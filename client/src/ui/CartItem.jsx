import styled from "styled-components";
import Seperator from "./Seperator";
import { FaX } from "react-icons/fa6";
import { useQuantity } from "../hooks/useQuantity";
import { formatToTwoDecimal } from "../hooks/formattoTwoDecimal";
import { CartLink } from "../features/cart/CartRow";
import { Link } from "react-router-dom";

const StyledCartItem = styled.div`
  & {
    .body {
      display: flex;

      align-items: center;
      gap: 1rem;
      padding: 1rem;

      & img {
        max-width: 40px;
      }

      & .product {
        m .product-name {
          font-weight: t00;
        }

        .quantity {
          font-size: var(--fs-small);
          color: var(--color-grey);

          & .price {
            color: var(--color-black);
          }
        }
      }

      & button {
        border: none;
        background: none;
        margin-left: 1rem;
        cursor: pointer;
        margin-left: auto;
      }
    }
  }
`;

function CartItem({ item }) {
  const { name, quantity, price, image, id } = item;

  const { handleRemoveItem } = useQuantity(item);

  return (
    <StyledCartItem>
      <Seperator $bg="var(--color-white-600)" />
      <div className="body">
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} />
        </Link>
        <div className="product">
          <CartLink to={`/products/${id}`}>
            <p className="product-name">{name}</p>
          </CartLink>
          <p className="quantity">
            {quantity} X{" "}
            <span className="price">${formatToTwoDecimal(price)}</span>
          </p>
        </div>
        <button onClick={handleRemoveItem}>
          <FaX />
        </button>
      </div>
    </StyledCartItem>
  );
}

export default CartItem;
