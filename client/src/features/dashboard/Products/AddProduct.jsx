import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal/Modal";
import CreateProductForm from "./CreateProductForm";

function AddProduct() {
  return (
    <Modal>
      <Modal.Open opens="product-form">
        <Button>Add new product</Button>
      </Modal.Open>
      <Modal.Window name="product-form">
        <CreateProductForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button>Add new product</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <form>
          <label>Table Name</label>
          <input type="text" />
        </form>
      </Modal.Window> */}
    </Modal>
  );
}

export default AddProduct;
