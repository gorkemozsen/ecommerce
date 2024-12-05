import { useState } from "react";
import styled from "styled-components";

import { useCreateProduct } from "./useCreateProduct";
import { useDeleteProduct } from "./useDeleteProduct";
import { formatToTwoDecimal } from "../../../hooks/formattoTwoDecimal";

import { TableItem } from "../Orders/OrderRow";
import Table from "../../../ui/Table";
import Modal from "../../../ui/Modal/Modal";
import Button from "../../../ui/Button";
import CreateProductForm from "./CreateProductForm";
import Confirm from "../../../ui/Confirm";
import Menus from "../../../ui/Menus";

const Img = styled.img`
  && {
    width: 50px;
    height: 50px;
    border-radius: 100%;
  }
`;

const Actions = styled(TableItem)`
  && {
    display: flex;
    align-items: center;
    align-self: flex-end;
    margin-left: auto;
    font-size: var(--fs-small);
  }
`;

function ProductRow({ product }) {
  const { id, name, image, price, stock } = product;
  const { createProduct, isPending: isDuplicating } = useCreateProduct();
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const isWorking = isDuplicating || isDeleting;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDuplicate() {
    createProduct({
      ...product,
      name: `Copy of ${product?.name}`,
    });
  }

  function handleDelete() {
    deleteProduct(product?.id);
  }

  return (
    <Table.Row>
      <Img src={image} />
      <TableItem>
        <span>Name: </span>
        {name}
      </TableItem>
      <TableItem>
        <span>Price: </span>$ {formatToTwoDecimal(price)}
      </TableItem>
      <TableItem>
        <span>Stock: </span>
        {stock}
      </TableItem>
      <div></div>

      <Actions>
        <Menus
          onIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          isModalOpen={isModalOpen}
        >
          <Modal onIsModalOpen={setIsModalOpen}>
            <Modal.Open opens="product-edit">
              <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
            </Modal.Open>
            <Modal.Window name="product-edit">
              <CreateProductForm productToEdit={product} />
            </Modal.Window>
          </Modal>

          <Modal onIsModalOpen={setIsModalOpen}>
            <Modal.Open opens="product-duplicate">
              <Button>Duplicate</Button>
            </Modal.Open>
            <Modal.Window name="product-duplicate">
              <Confirm
                operation="Duplicate"
                title={`Duplicate ${product?.name}`}
                description={`Are you sure want to duplicate ${product?.name} ?`}
                onConfirm={handleDuplicate}
                disabled={isWorking}
              />
            </Modal.Window>
          </Modal>

          <Modal onIsModalOpen={setIsModalOpen}>
            <Modal.Open opens="product-delete">
              <Button>Delete</Button>
            </Modal.Open>
            <Modal.Window name="product-delete">
              <Confirm
                operation="Delete"
                title={`Delete ${product?.name}`}
                description={`Are you sure want to Delete ${product?.name} ?`}
                onConfirm={() => handleDelete(product?.id)}
                disabled={isWorking}
              />
            </Modal.Window>
          </Modal>
        </Menus>
      </Actions>
    </Table.Row>
  );
}

export default ProductRow;
