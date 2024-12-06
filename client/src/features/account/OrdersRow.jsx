import { formatDateToLocal } from "../../hooks/formatDateToLocal";
import { formatToTwoDecimal } from "../../hooks/formattoTwoDecimal";
import { useCancelOrder } from "../order/useCancelOrder";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal/Modal";
import Table from "../../ui/Table";
import Confirm from "../../ui/Confirm";

function OrderRow({ order }) {
  const { id, items, date, total, status } = order;

  const { isPending, cancelOrder } = useCancelOrder();

  return (
    <Table.Row>
      <Table.Item>
        <span>Order ID: </span>
        {id}
      </Table.Item>
      <Table.Item>
        <span>Items: </span>
        {items.map((item) => (
          <p key={item.productId}>{`${item.productId} X ${item.quantity}`}</p>
        ))}
      </Table.Item>
      <Table.Item>
        <span>Date: </span>
        {formatDateToLocal(date)}
      </Table.Item>
      <Table.Item>
        <span>Price:</span> ${formatToTwoDecimal(total)}
      </Table.Item>
      <Table.Item>
        <span>Status: </span>
        {status}
      </Table.Item>
      <Table.Item>
        {status !== "cancelled" && status === "pending" && (
          <Modal>
            <Modal.Open opens="product-edit">
              <Button>Cancel</Button>
            </Modal.Open>
            <Modal.Window name="product-edit">
              <Confirm
                title="Cancel Order"
                operation="Yes"
                disabled={isPending}
                description={`Are you sure want to cancel order "${id}"`}
                onConfirm={() => {
                  cancelOrder(id);
                }}
              />
            </Modal.Window>
          </Modal>
        )}
      </Table.Item>
    </Table.Row>
  );
}

export default OrderRow;
