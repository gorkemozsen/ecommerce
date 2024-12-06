import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal/Modal";
import AddCategoryForm from "./AddCategoryForm";

function AddCategory() {
  return (
    <Modal>
      <Modal.Open opens="category-form">
        <Button>Add new category</Button>
      </Modal.Open>
      <Modal.Window name="category-form">
        <AddCategoryForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCategory;
