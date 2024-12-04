import CartTable from "../../features/cart/CartTable";
import CartTotal from "../../features/cart/CartTotal";
import StyledCart from "./Cart.styles";

function Cart() {
  return (
    <StyledCart className="row justify-content-center">
      <CartTable className="col-lg-8 col-12 pe-lg-5" />
      <CartTotal className="col-lg-4 col-12" />
    </StyledCart>
  );
}

export default Cart;
