import styled from "styled-components";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import { useForm } from "react-hook-form";
import Select from "../../../ui/Select";
import { useCategories } from "../Categories/useCategories";
import Spinner from "../../../ui/Spinner";
import Error from "../../../ui/Error";
import Button from "../../../ui/Button";
import { useAddCategory } from "../Categories/useAddCategory";
import { useUpdateCategory } from "../Categories/useUpdateCategory";

const StyledAddCategoryForm = styled(Form)`
  && {
  }
`;

function AddCategoryForm({ categoryToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = categoryToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? { categoryName: editValues.name, parentCategory: editValues.parentId }
      : { categoryName: "", parentCategory: "" },
  });

  const {
    addCategory,
    isPending: isCreating,
    error: addingError,
  } = useAddCategory();

  const {
    updateCategory,
    isPending: isUpdating,
    error: updatingError,
  } = useUpdateCategory();

  const isWorking = isCreating || isUpdating;

  const { errors } = formState;

  const {
    categories,
    isCategoriesPending,
    error: useCategoriesError,
  } = useCategories();

  if (isCategoriesPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  if (useCategoriesError) return <Error>{useCategoriesError.message}</Error>;

  function onSubmit(data) {
    const formData = { name: data.categoryName, parentId: data.parentCategory };

    console.log(formData);

    if (isEditSession)
      updateCategory(
        { categoryId: editId, updatedCategory: formData },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      addCategory(formData, {
        onSuccess: (data) => {
          reset();
          onCloseModal?.();
        },
      });
  }

  return (
    <StyledAddCategoryForm onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-5">
        {isEditSession
          ? `Edit "${categoryToEdit?.name}" category`
          : "Create New Category"}
      </h2>
      <FormRow label="Category Name" error={errors?.categoryName?.message}>
        <Input
          type="text"
          id="categoryName"
          {...register("categoryName", {
            required: "Category name is required",
          })}
        />
      </FormRow>

      <FormRow label="Parent Category" error={errors?.parentCategory?.message}>
        <Select
          id="parentCategory"
          disabled={isCategoriesPending}
          register={register("parentCategory")}
          options={
            categories && [
              { value: null, label: null },
              ...categories.map((category) => ({
                value: category.id,
                label: category.name,
              })),
            ]
          }
        />
      </FormRow>

      <div className="btn-box">
        <Button type="reset" onClick={() => onCloseModal?.(false)}>
          Cancel
        </Button>
        <Button type="submit">{isEditSession ? "Update" : "Create"}</Button>
      </div>
    </StyledAddCategoryForm>
  );
}

export default AddCategoryForm;
