/* eslint-disable react/prop-types */
import { FaX } from "react-icons/fa6";

import Table from "../../ui/Table";
import styled from "styled-components";

import QuantityBar from "../../ui/QuantityBar";
import { useQuantity } from "../../hooks/useQuantity";
import { useSingleProduct } from "../shop/useSingleProduct";
import { useEffect } from "react";
import { formatToTwoDecimal } from "../../hooks/formattoTwoDecimal";
import { Link } from "react-router-dom";

const Img = styled.img`
  && {
    display: block;
    width: 6rem;
    height: 6rem;
    border-radius: 100%;

    object-fit: cover;
    object-position: center;
  }
`;

export const CartLink = styled(Link)`
  && {
    text-decoration: none;
    text-transform: capitalize;
    color: var(--color-black);

    transition: all 0.3s;
    &:hover {
      color: var(--color-secondary);
      text-decoration: underline;
    }
  }
`;

const RemoveButton = styled.button`
  && {
    border: none;
    background: none;
    color: var(--color-white-500);
    transition: all 0.4s;

    &:hover {
      color: red;
      transform: scale(120%);
    }
  }
`;

function CartRow({ item }) {
  const { name, price, image, quantity, id } = item;

  const { product } = useSingleProduct(id);

  const {
    handleButtonClick,
    handleInputChange,
    handleRemoveItem,
    currentQuantity,
    setCurrentQuantity,
  } = useQuantity(product?.product, true);

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity, setCurrentQuantity]);

  return (
    <Table.Row>
      <RemoveButton onClick={handleRemoveItem}>
        <FaX />
      </RemoveButton>

      <Link to={`/products/${id}`}>
        <Img src={image} />
      </Link>

      <CartLink to={`/products/${id}`}>{name}</CartLink>

      <QuantityBar
        onButtonClick={handleButtonClick}
        onInputChange={handleInputChange}
        currentQuantity={currentQuantity}
      />

      <p>$ {formatToTwoDecimal(price * currentQuantity)}</p>
    </Table.Row>
  );
}

export default CartRow;
