import Products from "../../features/shop/Products";
import ProductTableOperations from "../../features/shop/ProductTableOperations";
import StyledShop from "./Shop.styles";

function Shop() {
  return (
    <StyledShop>
      <ProductTableOperations />
      <Products />
    </StyledShop>
  );
}

export default Shop;
