import { useForm } from "react-hook-form";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Button from "../../../ui/Button";
import { useEditOrder } from "./useEditOrder";
import styled from "styled-components";

const StyledEditOrderForm = styled(Form)`
  && {
    & .btn-box {
      display: flex;
      gap: 2rem;
    }
  }
`;

function EditOrderForm({ orderToEdit = {}, onCloseModal }) {
  const { isPending, editOrder } = useEditOrder();

  const { id: editId, status, items, total } = orderToEdit;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { status: status.charAt(0).toUpperCase() + status.slice(1) },
  });
  const { errors } = formState;

  function onSubmit(data) {
    const formData = { ...data };

    editOrder(
      { changedOrder: formData, id: editId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledEditOrderForm onSubmit={handleSubmit(onSubmit, onSubmit)}>
      <h2 className="mb-5">{`Edit Order: ${orderToEdit.id}`}</h2>

      <FormRow label={"Order status"} error={errors?.name?.message}>
        <select
          type="text"
          id="status"
          disabled={isPending}
          {...register("status", {
            required: "This field is required",
          })}
        >
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </FormRow>
      <div className="btn-box">
        <Button type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          Apply
        </Button>
      </div>
    </StyledEditOrderForm>
  );
}

export default EditOrderForm;
