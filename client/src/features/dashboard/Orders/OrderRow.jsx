import styled from "styled-components";
import { useState } from "react";
import { formatDateToLocal } from "../../../hooks/formatDateToLocal";
import { formatToTwoDecimal } from "../../../hooks/formattoTwoDecimal";
import EditOrderForm from "./EditOrderForm";
import Table from "../../../ui/Table";
import Modal from "../../../ui/Modal/Modal";
import Button from "../../../ui/Button";

const ChangeButton = styled(Button)`
  && {
    font-size: var(--fs-small);
  }
`;

function OrderRow({ order }) {
  const { id, date, total, status, items, createdBy } = order;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Table.Row>
      <Table.Item>
        <span>Order: </span> {id}
      </Table.Item>
      <Table.Item>
        <span>Items: </span>
        {items.map((item) => (
          <p key={item.productId}>{`${item?.productId} x ${item?.quantity}`}</p>
        ))}
      </Table.Item>
      <Table.Item>
        <span>Total: </span> $ {formatToTwoDecimal(total)}
      </Table.Item>
      <Table.Item>
        <span>Date: </span>
        {formatDateToLocal(date)}
      </Table.Item>
      <Table.Item>
        <span>Status: </span>
        {status}
      </Table.Item>
      <Table.Item>
        <span>Created By: </span>
        {createdBy}
      </Table.Item>

      <Table.Item>
        <Modal onIsModalOpen={setIsModalOpen}>
          <Modal.Open opens="order-edit">
            <ChangeButton onClick={() => setIsModalOpen(true)}>
              Change Status
            </ChangeButton>
          </Modal.Open>
          <Modal.Window name="order-edit">
            <EditOrderForm orderToEdit={order} />
          </Modal.Window>
        </Modal>
      </Table.Item>
    </Table.Row>
  );
}

export default OrderRow;
