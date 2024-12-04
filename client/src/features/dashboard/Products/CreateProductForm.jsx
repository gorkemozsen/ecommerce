import { useForm } from "react-hook-form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import { useCreateProduct } from "./useCreateProduct";
import Button from "../../../ui/Button";
import { useEditProduct } from "./useEditProduct";
import { useUpload } from "../../useUpload";
import { useState } from "react";
import styled from "styled-components";
import TextArea from "../../../ui/TextArea";
import Form from "../../../ui/Form";

const Img = styled.img`
  && {
    width: 100px;
    height: 100px;
  }
`;

const PhotoRow = styled(FormRow)`
  && {
    flex-wrap: wrap !important;
  }
`;

function CreateProductForm({ productToEdit = {}, onCloseModal }) {
  const { isPending: isCreating, createProduct } = useCreateProduct();
  const { isPending: isEditing, editProduct } = useEditProduct();
  const { isPending: isUploading, mutate: uploadFile } = useUpload();

  const isWorking = isCreating || isEditing || isUploading;

  const [imageSrc, setImageSrc] = useState(productToEdit?.image || "");

  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, setValue, reset, formState } = useForm({
    defaultValues: isEditSession ? { ...editValues, image: imageSrc } : {},
  });
  const { errors } = formState;

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    uploadFile(file, {
      onSuccess: (data) => {
        setImageSrc(data.src);
        setValue("image", data.src);
      },
    });
  }

  function onSubmit(data) {
    const formData = { ...data, image: imageSrc };

    if (isEditSession)
      editProduct(
        { changedProduct: formData, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createProduct(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onSubmit)}>
      <h2 className="mb-5">
        {isEditSession ? `Edit "${productToEdit.name}"` : "Create New Product"}
      </h2>

      <FormRow label={"Product name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Description"} error={errors?.description?.message}>
        <TextArea
          id="description"
          disabled={isWorking}
          rows={5}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Price"} error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Stock"} error={errors?.stock?.message}>
        <Input
          type="number"
          id="stock"
          disabled={isWorking}
          defaultValue={1}
          {...register("stock", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Stock should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Product photo"} error={errors?.image?.message}>
        <div>{imageSrc && <Img src={imageSrc} />}</div>

        <Input
          id="image"
          type="file"
          accept="image/*"
          disabled={isWorking}
          onChange={handleFileChange}
        />
        <Input
          type="hidden"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <div className="d-flex gap-3 justify-content-end">
        <Button type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isEditSession ? "Edit Product" : "Create Product"}
        </Button>
      </div>
    </Form>
  );
}

export default CreateProductForm;
