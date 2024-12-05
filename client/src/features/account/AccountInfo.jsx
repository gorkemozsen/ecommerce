import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useUser } from "../authentication/useUser";
import { useEmailUpdate } from "../authentication/useEmailUpdate";
import { usePassUpdate } from "../authentication/usePassUpdate";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

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
  const isWorking = isEmailUpdating || isPasswordUpdating;

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
            reset();
            setIsEmailEdit(false);
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
            reset();
            setIsPassEdit(false);
          },
        }
      );
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit, onSubmit)}>
      <FormRow label={"First name"} error={errors?.firstName?.message}>
        <Input
          type="text"
          id="firstName"
          disabled={isWorking}
          {...register("firstName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Last name"} error={errors?.lastName?.message}>
        <Input
          type="text"
          id="lastName"
          disabled={isWorking}
          {...register("lastName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {!isEmailEdit && (
        <FormRow label={"Email"} error={errors?.email?.message}>
          {!isEditSession ? (
            <Button
              disabled={isWorking}
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
            disabled={isPending || !isEmailEdit || isWorking}
            {...register("email", {
              required: "This field is required",
            })}
          />
        </FormRow>
      )}

      {isEmailEdit && (
        <FormRow label={"New Email"} error={errors?.newEmail?.message}>
          <Input
            type="email"
            id="newEmail"
            disabled={isPending || !isEmailEdit || isWorking}
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
            disabled={isPending || !isEditSession || isWorking}
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
        error={errors?.newPassword?.message}
      >
        {isPassEdit && (
          <Input
            type="password"
            id="newPassword"
            disabled={isPending || !isEditSession || isWorking}
            {...register("newPassword", {
              required: "This field is required",
            })}
          />
        )}

        {!isEditSession ? (
          <Button
            disabled={isWorking}
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
            disabled={isPending || !isPassEdit || isWorking}
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
              disabled={isWorking}
              onClick={(e) => {
                e.preventDefault();
                reset(editValues);
                setIsEmailEdit(false);
                setIsPassEdit(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending || isWorking}>
              Save
            </Button>
          </>
        )}
      </div>
    </StyledForm>
  );
}

export default AccountInfo;
