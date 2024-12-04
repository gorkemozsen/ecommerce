import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal/Modal";
import Table from "../../ui/Table";
import Confirm from "../../ui/Confirm";
import { formatDateToLocal } from "../../hooks/formatDateToLocal";
import { formatToTwoDecimal } from "../../hooks/formattoTwoDecimal";
import { useCancelOrder } from "../order/useCancelOrder";
import { TableItem } from "../dashboard/Orders/OrderRow";

function OrderRow({ order }) {
  const { id, items, date, total, status } = order;

  const { isPending, cancelOrder } = useCancelOrder();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Table.Row>
      <TableItem>
        <span>Order ID: </span>
        {id}
      </TableItem>
      <TableItem>
        <span>Items: </span>
        {items.map((item) => (
          <p key={item.productId}>{`${item.productId} X ${item.quantity}`}</p>
        ))}
      </TableItem>
      <TableItem>
        <span>Date: </span>
        {formatDateToLocal(date)}
      </TableItem>
      <TableItem>
        <span>Price:</span> ${formatToTwoDecimal(total)}
      </TableItem>
      <TableItem>
        <span>Status: </span>
        {status}
      </TableItem>
      <TableItem>
        {status !== "cancelled" && status === "pending" && (
          <Modal onIsModalOpen={setIsModalOpen}>
            <Modal.Open opens="product-edit">
              <Button>Cancel</Button>
            </Modal.Open>
            <Modal.Window name="product-edit">
              <Confirm
                title="Cancel Order"
                operation="Yes"
                description={`Are you sure want to cancel order "${id}"`}
                onConfirm={() => {
                  cancelOrder(id);
                }}
              />
            </Modal.Window>
          </Modal>
        )}
      </TableItem>
    </Table.Row>
  );
}

export default OrderRow;
