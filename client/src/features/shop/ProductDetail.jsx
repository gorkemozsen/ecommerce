import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useSingleProduct } from "./useSingleProduct";
import { addItem } from "../cart/cartSlice";
import { useQuantity } from "../../hooks/useQuantity";
import { findItemInCart } from "../cart/cartUtils";
import { formatToTwoDecimal } from "../../hooks/formattoTwoDecimal";

import InnerImageZoom from "react-inner-image-zoom";
import QuantityBar from "../../ui/QuantityBar";
import Button from "../../ui/Button";
import Seperator from "../../ui/Seperator";
import { FaCodeCompare, FaHeart } from "react-icons/fa6";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaShareAlt,
  FaTwitterSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import ProductInfo from "../../ui/ProductInfo";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";

const StyledProductDetail = styled.section`
  && {
    padding: 2rem;

    & .product-header {
      & .buy-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        & h1 {
          font-size: var(--fs-h1);
          font-weight: 600;
        }

        & span {
          font-size: var(--fs-medium);
          color: var(--color-grey);
          text-transform: uppercase;
          &:nth-child(2) {
          }
        }

        & p {
          color: var(--color-secondary);
          font-size: var(--fs-h3);
          font-weight: 600;
        }

        & .quantity {
          display: flex;
          margin-top: 2rem;
          gap: 2rem;

          & div {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0 1rem;
            background-color: var(--color-white);

            & span {
              color: var(--color-black);
              font-weight: 600;
              letter-spacing: 0.2rem;
              text-transform: none;
            }
          }
        }
      }
    }
    && .buy-box__footer {
      font-size: var(--fs-medium);

      &,
      p {
        color: var(--color-black);
        font-weight: 400;
        letter-spacing: 0.3rem;
      }

      & span {
        letter-spacing: 0;
      }
    }
  }
`;

const Operation = styled.div`
  && {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    & svg {
      padding: 0.8rem;
      border-radius: 100%;
      background-color: var(--color-white-500);
      color: white;
      font-size: 32px;
    }

    & .socical-icons {
      & svg {
        margin-right: 0.2rem;
        font-size: 25px;
        padding: 0.4rem;
      }
    }

    && p {
      font-size: 12px;
      color: var(--color-grey);
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
    }
  }
`;

const ImgBox = styled.div`
  && {
    width: 450px;
    height: 450px;
  }
`;

function ProductDetail() {
  const { id } = useParams();
  const { product: productRes, isPending, error } = useSingleProduct(id);
  const dispatch = useDispatch();

  const product = productRes?.product || null;

  const {
    handleButtonClick,
    handleInputChange,
    handleRemoveItem,
    currentQuantity,
    setCurrentQuantity,
  } = useQuantity(product);

  const cart = useSelector((state) => state.cart.items);

  const isAtCart = findItemInCart(cart, product?.id);

  useEffect(() => {
    if (isAtCart) setCurrentQuantity(isAtCart.quantity);
  }, [isAtCart, setCurrentQuantity]);

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  if (error) return <Error>{error.message}</Error>;

  function handleAddToCart() {
    dispatch(addItem({ product, quantity: currentQuantity }));
  }

  const {
    name,
    image,
    id: productId,
    description,
    stock,
    price,
    categories,
  } = product;

  const displayCategory = categories[categories.length - 1]?.name;

  return (
    <StyledProductDetail className="container mx-auto">
      <div className="product-header flex-wrap justify-content-around row">
        <ImgBox className="d-flex justify-content-center align-items-center col-12 col-lg-6 p-3">
          <InnerImageZoom
            src={image}
            zoomSrc={image}
            zoomType="hover"
            zoomScale={1}
            width={450}
            height={450}
          />
        </ImgBox>

        <div className="buy-box col-lg-6 col-12 p-3">
          <h1>{name}</h1>
          <div>
            <span>Price:</span>
            <p>$ {formatToTwoDecimal(price * currentQuantity)}</p>
            <Seperator $bg="var(--color-grey)" />
          </div>

          <div className="quantity">
            <div>
              <span>Quantity</span>
              <QuantityBar
                onButtonClick={handleButtonClick}
                onInputChange={handleInputChange}
                currentQuantity={currentQuantity}
              />
            </div>

            {isAtCart && isAtCart.quantity === currentQuantity ? (
              <Button onClick={handleRemoveItem}>Remove From Cart</Button>
            ) : (
              <Button onClick={handleAddToCart}>
                {isAtCart ? "Update Cart" : "Add to Cart"}
              </Button>
            )}
          </div>

          <div className="operations">
            <Operation className="operation">
              <FaCodeCompare />
              <p>Compare</p>
            </Operation>

            <Operation className="operation">
              <FaHeart />
              <p>Add to Wishlist</p>
            </Operation>

            <Operation className="operation">
              <FaShareAlt />
              <p>Share</p>
              <div className="socical-icons">
                <FaFacebookSquare />
                <FaTwitterSquare />
                <FaInstagramSquare />
                <FaWhatsappSquare />
              </div>
            </Operation>
          </div>

          <Seperator $bg="var(--color-grey)" />

          <p className="buy-box__footer">
            Category:{" "}
            <Link to={`/categories/${displayCategory?.toLowerCase()}`}>
              {displayCategory || "Uncategorized"}
            </Link>
          </p>
        </div>
      </div>
      <ProductInfo
        tabs={[
          { title: "Description", content: description },
          {
            title: "Additional Information",
            content:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam fugit animi quisquam blanditiis illo sapiente ut unde provident nobis velit assumenda quis nesciunt, expedita doloribus cupiditate amet repellat voluptatibus praesentium?",
          },
          {
            title: "Reviews",
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, harum veniam atque totam error labore dignissimos repellat quasi magni quae aliquam animi hic necessitatibus in sed voluptas ipsa nihil accusamus odit officia ab debitis. Architecto ipsa vitae voluptate et distinctio.",
          },
        ]}
      />
    </StyledProductDetail>
  );
}

export default ProductDetail;
