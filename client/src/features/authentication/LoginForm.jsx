import styled from "styled-components";
import { useForm } from "react-hook-form";

import { useSignIn } from "./useSignIn";

import Button from "../../ui/Button";
import Link from "../../ui/Link";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

export const StyledLoginForm = styled(Form)`
  && {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 380px;

    & label {
      margin-right: 1rem;
    }

    & a {
      text-align: center;
      margin-top: 2rem;
    }

    @media (min-width: 992px) {
      min-width: 40vw;
    }
  }
`;

function LoginForm() {
  const { signin, isPending } = useSignIn();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit({ email, password }) {
    signin({ email, password });
  }

  return (
    <>
      <StyledLoginForm
        title="Login"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            disabled={isPending}
            $bg="white"
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
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
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 chars.",
              },
            })}
          />
        </FormRow>
        <Button disabled={isPending}>Log In</Button>
        <Link>Lost your password?</Link>
      </StyledLoginForm>
    </>
  );
}

export default LoginForm;
