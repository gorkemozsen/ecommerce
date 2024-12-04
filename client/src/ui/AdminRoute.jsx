import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function AdminRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const { isPending, user, error } = useUser();

  useEffect(() => {
    if (error) {
      navigate("/login", { replace: true });
      return;
    }

    if (!isPending && (!user || user.role !== "admin")) {
      navigate("/login", { replace: true });
    }
  }, [error, user, token, isPending, navigate]);

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  if (!user || user.role !== "admin") {
    return <p>You have no permission to see this page.</p>;
  }

  return children;
}

export default AdminRoute;
