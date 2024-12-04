import styled from "styled-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addItem } from "../features/cart/cartSlice";
import { useQuantity } from "../hooks/useQuantity";
import QuantityBar from "./QuantityBar";
import { findItemInCart } from "../features/cart/cartUtils";
import Button from "./Button";
import { formatToTwoDecimal } from "../hooks/formattoTwoDecimal";

const StyledProductCard = styled.li`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    &:hover button,
    &:hover img,
    &:hover a {
      transform: scale(110%);
    }

    & .caption {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 3rem;
    }
  }
`;

const Name = styled.a`
  && {
    text-decoration: none;
    color: var(--color-black);
    transition: all 0.4s;

    cursor: pointer;
    &:hover {
      text-decoration: underline;
      transform: scale(105%);
    }
  }
`;

const Price = styled.span`
  && {
    color: var(--color-secondary);
    font-size: var(--fs-h4);
    font-weight: 500;
  }
`;

const ImgMask = styled.div`
  && {
    width: 370px;
    height: 370px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }
`;

const Img = styled.img`
  && {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.5s;
  }
`;

const Category = styled.span`
  && {
    text-transform: uppercase;
    font-size: var(--fs-small);
    letter-spacing: 0.2rem;
  }
`;

function ProductCard({ product }) {
  const { id, name, description, image, price, stock } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAddToCart(e) {
    e.stopPropagation();
    dispatch(addItem({ product, quantity: 1 }));
  }

  const cart = useSelector((state) => state.cart.items);

  const {
    handleButtonClick,
    handleInputChange,
    currentQuantity,
    setCurrentQuantity,
  } = useQuantity(product, true);

  const isAtCart = findItemInCart(cart, id);

  useEffect(() => {
    if (isAtCart) setCurrentQuantity(isAtCart.quantity);
  }, [isAtCart, setCurrentQuantity]);

  return (
    <StyledProductCard>
      <ImgMask>
        <Img onClick={() => navigate(`/products/${id}`)} src={image} />
      </ImgMask>

      <div className="caption">
        <Category>{"Uncategorized"}</Category>
        <Name onClick={() => navigate(`/products/${id}`)}>
          <h3>{name}</h3>
        </Name>
        <Price className="price">
          ${formatToTwoDecimal(price * currentQuantity)}
        </Price>

        {!isAtCart && (
          <Button
            $color={
              stock <= 0 && {
                color: "var(--color-grey)",
                bg: "var(--color-white-300)",
                hover: "var(--color-primary)",
              }
            }
            disabled={stock <= 0}
            onClick={handleAddToCart}
          >
            {stock <= 0 ? "Sold Out" : "ADD TO CART"}
          </Button>
        )}
        {isAtCart && (
          <QuantityBar
            onButtonClick={handleButtonClick}
            onInputChange={handleInputChange}
            currentQuantity={currentQuantity}
          />
        )}
      </div>
    </StyledProductCard>
  );
}

export default ProductCard;
