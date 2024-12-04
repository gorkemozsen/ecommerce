import { useSelector } from "react-redux";
import Table from "../../ui/Table";
import CartRow from "./CartRow";

import styled from "styled-components";

const StyledCartTable = styled.div``;

const Empty = styled.div``;

function CartTable(props) {
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems.length === 0)
    return (
      <Empty {...props}>
        <p>No products in your cart...</p>
      </Empty>
    );

  return (
    <StyledCartTable {...props}>
      <Table columns=".2fr .2fr .5fr .1fr .2fr">
        <Table.Body
          data={cartItems}
          render={(item) => <CartRow key={item.id} item={item} />}
        ></Table.Body>
      </Table>
    </StyledCartTable>
  );
}

export default CartTable;