import { useState } from "react";
import Table from "../../../ui/Table";
import styled from "styled-components";
import Menus from "../../../ui/Menus";
import Modal from "../../../ui/Modal/Modal";
import Button from "../../../ui/Button";
import AddCategoryForm from "../Products/AddCategoryForm";
import Confirm from "../../../ui/Confirm";
import { useAddCategory } from "./useAddCategory";
import { useDeleteCategory } from "./useDeleteCategory";
import { useUpdateCategory } from "./useUpdateCategory";

const TableItem = styled.div``;

const Actions = styled(TableItem)`
  && {
    display: flex;
    align-items: center;
    align-self: flex-end;
    margin-left: auto;
    font-size: var(--fs-small);
  }
`;

function CategoryRow({ category }) {
  const {
    addCategory,
    isPending: isCreating,
    error: addError,
  } = useAddCategory();
  const {
    deleteCategory,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteCategory();
  const {
    updateCategory,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateCategory();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDeleteCategory() {
    deleteCategory(category?.id);
  }

  return (
    <Table.Row>
      <Table.Item>
        <span>Id: </span>
        {category.id}
      </Table.Item>
      <Table.Item>
        <span>Category: </span>
        {category.name}
      </Table.Item>
      <Table.Item>
        <span>Parent: </span>
        {category?.parentId}
      </Table.Item>

      <Actions>
        <Menus
          onIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          isModalOpen={isModalOpen}
        >
          <Modal onIsModalOpen={setIsMenuOpen}>
            <Modal.Open opens="category-edit">
              <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
            </Modal.Open>

            <Modal.Window name="category-edit">
              <AddCategoryForm categoryToEdit={category} />
            </Modal.Window>
          </Modal>

          <Modal onIsModalOpen={setIsMenuOpen}>
            <Modal.Open opens="category-delete">
              <Button onClick={() => setIsModalOpen(true)}>delete</Button>
            </Modal.Open>

            <Modal.Window name="category-delete">
              <Confirm
                operation="Delete"
                title={`Delete ${category?.name}`}
                description={`Are you sure want to delete ${category?.name}`}
                onConfirm={handleDeleteCategory}
              />
            </Modal.Window>
          </Modal>
        </Menus>
      </Actions>
    </Table.Row>
  );
}

export default CategoryRow;
