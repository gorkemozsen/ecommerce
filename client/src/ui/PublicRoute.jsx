import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

function PublicRoute({ children }) {
  const { isPending, error } = useUser();

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  if (!error) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
