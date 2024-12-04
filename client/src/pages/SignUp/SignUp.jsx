import SignUpForm from "../../features/authentication/SignUpForm";
import StyledSignUp from "./SignUp.styles";

function SignUp() {
  return (
    <StyledSignUp className="py-5 d-flex flex-column align-items-center">
      <SignUpForm />
    </StyledSignUp>
  );
}

export default SignUp;
