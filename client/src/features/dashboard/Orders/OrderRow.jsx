import styled from "styled-components";
import { useState } from "react";

import { formatDateToLocal } from "../../../hooks/formatDateToLocal";
import { formatToTwoDecimal } from "../../../hooks/formattoTwoDecimal";

import EditOrderForm from "./EditOrderForm";
import Table from "../../../ui/Table";
import Modal from "../../../ui/Modal/Modal";
import Button from "../../../ui/Button";

export const TableItem = styled.div`
  && {
    & span {
      font-weight: 600;
      display: none;

      @media (max-width: 992px) {
        display: block;
      }
    }
  }
`;

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
      <TableItem>
        <span>Order: </span> {id}
      </TableItem>
      <TableItem>
        <span>Items: </span>
        {items.map((item) => (
          <p key={item.productId}>{`${item?.productId} x ${item?.quantity}`}</p>
        ))}
      </TableItem>
      <TableItem>
        <span>Total: </span> $ {formatToTwoDecimal(total)}
      </TableItem>
      <TableItem>
        <span>Date: </span>
        {formatDateToLocal(date)}
      </TableItem>
      <TableItem>
        <span>Status: </span>
        {status}
      </TableItem>
      <TableItem>
        <span>Created By: </span>
        {createdBy}
      </TableItem>

      <TableItem>
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
      </TableItem>
    </Table.Row>
  );
}

export default OrderRow;
