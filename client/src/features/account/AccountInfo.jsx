import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useState } from "react";
import styled from "styled-components";
import Form from "../../ui/Form";
import { useUser } from "../authentication/useUser";
import { useEmailUpdate } from "../authentication/useEmailUpdate";
import { usePassUpdate } from "../authentication/usePassUpdate";

const StyledForm = styled(Form)`
  && {
    display: flex;
    flex-direction: column;
  }
`;

function AccountInfo() {
  const { user, isPending } = useUser();

  const { updateEmail, isPending: isEmailUpdating } = useEmailUpdate();
  const { updatePassword, isPending: isPasswordUpdating } = usePassUpdate();

  const [isPassEdit, setIsPassEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const isEditSession = isEmailEdit || isPassEdit;

  const { id: editId, ...editValues } = user;

  const { register, handleSubmit, getValues, setValue, reset, formState } =
    useForm({
      defaultValues: isEditSession ? {} : { ...editValues },
    });
  const { errors } = formState;

  function onSubmit(data) {
    if (isEmailEdit) {
      updateEmail(
        {
          newEmail: data.newEmail,
          currentPassword: data.currentPassword,
        },
        {
          onSuccess: () => {
            reset(); // Formu sıfırlar
            setIsEmailEdit(false); // E-posta düzenleme modunu kapatır
            setValue("email", data.newEmail);
          },
        }
      );
    }
    if (isPassEdit) {
      updatePassword(
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        },
        {
          onSuccess: () => {
            reset(); // Formu sıfırlar
            setIsPassEdit(false); // E-posta düzenleme modunu kapatır
          },
        }
      );
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onSubmit)}>
      <FormRow label={"First name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="firstName"
          disabled
          {...register("firstName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Last name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="lastName"
          disabled
          {...register("lastName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {!isEmailEdit && (
        <FormRow label={"Email"} error={errors?.name?.message}>
          {!isEditSession ? (
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (!isEditSession) {
                  setIsEmailEdit((edit) => !edit);
                }
              }}
            >
              Change
            </Button>
          ) : null}
          <Input
            type="email"
            id="email"
            disabled={isPending || !isEmailEdit}
            {...register("email", {
              required: "This field is required",
            })}
          />
        </FormRow>
      )}

      {isEmailEdit && (
        <FormRow label={"New Email"} error={errors?.name?.message}>
          <Input
            type="email"
            id="newEmail"
            disabled={isPending || !isEmailEdit}
            {...register("newEmail", {
              required: "This field is required",
            })}
          />
        </FormRow>
      )}

      {isEditSession && (
        <FormRow
          label="Current password"
          error={errors?.currentPassword?.message}
        >
          <Input
            disabled={isPending || !isEditSession}
            $bg="white"
            type="password"
            id="currentPassword"
            {...register("currentPassword", {
              required: "Current password is required.",
            })}
          />
        </FormRow>
      )}

      <FormRow
        label={isPassEdit ? "New Password" : "Password"}
        error={errors?.name?.message}
      >
        {isPassEdit && (
          <Input
            type="password"
            id="newPassword"
            disabled={isPending || !isEditSession}
            {...register("newPassword", {
              required: "This field is required",
            })}
          />
        )}

        {!isEditSession ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (!isEditSession) {
                setIsPassEdit((edit) => !edit);
              }
            }}
          >
            Change
          </Button>
        ) : null}
      </FormRow>

      {isPassEdit && (
        <FormRow
          label="Confirm New password"
          error={errors?.confirmNewPassword?.message}
        >
          <Input
            disabled={isPending || !isPassEdit}
            $bg="white"
            type="password"
            id="confirmNewPassword"
            {...register("confirmNewPassword", {
              required: "Confirm password is required.",
              validate: (value) =>
                value === getValues().newPassword || "Passwords must match.",
            })}
          />
        </FormRow>
      )}

      <div className="d-flex gap-3 justify-content-end">
        {isEditSession && (
          <>
            <Button
              onClick={(e) => {
                e.preventDefault();
                reset(editValues);
                setIsEmailEdit(false);
                setIsPassEdit(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </>
        )}
      </div>
    </StyledForm>
  );
}

export default AccountInfo;
