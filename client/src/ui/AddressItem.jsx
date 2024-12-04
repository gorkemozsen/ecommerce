import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal/Modal";
import AddressForm from "../features/account/AddressForm";
import Confirm from "./Confirm";
import { useEditAddress } from "../features/account/useEditAddress";
import { useDeleteAddress } from "../features/account/useDeleteAddress";
import { FiEdit, FiHome } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const StyledAddressItem = styled.li`
  && {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    max-width: 220px;
    width: 100%;
    font-size: var(--fs-medium);
    padding: 1rem 0 0 0;
    box-shadow: 0px 0px 5px 2px #0000000d;

    @media (min-width: 992px) {
      justify-content: space-between;
    }

    & span {
      padding: 0.5rem;
      background-color: var(--color-white-600);
      border-radius: 5px;
      font-size: var(--fs-small);
      border-bottom: 2px solid var(--color-secondary);

      box-shadow: 0px 0px 5px 2px #0000000d;
    }
  }
`;

const Titles = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 1.5rem 0;

    & p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      font-weight: 500;

      & span {
        max-width: min-content;
      }
    }
  }
`;

const DefaultTag = styled.div`
  && {
    position: absolute;
    top: -11px;
    left: 0;
    padding: 0.1rem 0.5rem;
    background-color: var(--color-primary);
    border-radius: 5px;
    color: var(--color-white);
    letter-spacing: 0.2rem;
  }
`;

const Buttons = styled.div`
  && {
    display: flex;
    & button {
      width: 100%;
    }
  }
`;

function AddressItem({ address }) {
  const { editAddress, isPending } = useEditAddress();
  const { deleteAddress, isPending: isDeleting } = useDeleteAddress();

  function handleSetDefault() {
    editAddress({
      addressData: {
        isDefault: true,
      },
      addressId: address.id,
    });
  }
  function handleDelete() {
    deleteAddress(address.id);
  }

  return (
    <StyledAddressItem>
      <Titles>
        <p>
          Title <span>{address.addressTitle}</span>
        </p>
        <p>
          City <span>{address.city}</span>
        </p>
        <p>
          District <span>{address.district}</span>
        </p>
        <p>
          Street <span>{address.street.substring(0, 15) + "..."}</span>
        </p>
      </Titles>
      <Buttons>
        {address.isDefault ? (
          <DefaultTag>
            <p>
              Default <FiHome />
            </p>
          </DefaultTag>
        ) : (
          <>
            <Modal>
              <Modal.Open opens="address-default">
                <Button>
                  <FiHome />
                </Button>
              </Modal.Open>
              <Modal.Window name="address-default">
                <Confirm
                  operation="Accept"
                  title={`Set '${address.addressTitle}' as default address.`}
                  description={`Are you sure want to set '${address.addressTitle}' as your default address ?`}
                  onConfirm={handleSetDefault}
                />
              </Modal.Window>
            </Modal>
          </>
        )}
        <Modal>
          <Modal.Open opens="address-edit">
            <Button>
              <FiEdit />
            </Button>
          </Modal.Open>
          <Modal.Open opens="address-delete">
            <Button>
              <MdDeleteOutline />
            </Button>
          </Modal.Open>
          <Modal.Window name="address-edit">
            <AddressForm address={address} />
          </Modal.Window>
          <Modal.Window name="address-delete">
            <Confirm
              operation="Delete"
              title={`Delete '${address.addressTitle}'`}
              description={`Are you sure want to delete '${address.addressTitle}' ?`}
              onConfirm={handleDelete}
            />
          </Modal.Window>
        </Modal>
      </Buttons>
    </StyledAddressItem>
  );
}

export default AddressItem;
