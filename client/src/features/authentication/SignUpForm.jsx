import Button from "../../ui/Button";
import Link from "../../ui/Link";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { StyledLoginForm } from "./LoginForm";

function SignUpForm() {
  const { signup, isPending } = useSignup();

  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit({ email, password, firstName, lastName }) {
    signup({ email, password, firstName, lastName });
  }

  return (
    <>
      <StyledLoginForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormRow label="First Name" error={errors?.firstName?.message}>
          <Input
            disabled={isPending}
            $bg="white"
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "First name is required.",
              minLength: {
                value: 2,
                message: "First name must have at least 2 characters.",
              },
            })}
          />
        </FormRow>

        <FormRow label="Last Name" error={errors?.lastName?.message}>
          <Input
            disabled={isPending}
            $bg="white"
            type="text"
            id="lastName"
            {...register("lastName", {
              required: "Last name is required.",
              minLength: {
                value: 2,
                message: "Last name must have at least 2 characters.",
              },
            })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            disabled={isPending}
            $bg="white"
            type="email"
            id="email"
            {...register("email", {
              required: "Email address is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address.",
              },
            })}
          />
        </FormRow>

        <FormRow label="Password" error={errors?.password?.message}>
          <Input
            disabled={isPending}
            $bg="white"
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters.",
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Confirm password"
          error={errors?.confirmPassword?.message}
        >
          <Input
            disabled={isPending}
            $bg="white"
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm password is required.",
              validate: (value) =>
                value === getValues().password || "Passwords must match.",
            })}
          />
        </FormRow>

        <Button disabled={isPending}>Sign Up</Button>
        <Link>Do you have an account already?</Link>
      </StyledLoginForm>
    </>
  );
}

export default SignUpForm;
