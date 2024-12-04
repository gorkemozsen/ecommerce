import LoginForm from "../../features/authentication/LoginForm";
import StyledLogin from "./Login.styles";

function Login() {
  return (
    <StyledLogin className="py-5 d-flex flex-column align-items-center">
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
