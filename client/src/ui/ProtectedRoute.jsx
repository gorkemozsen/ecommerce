import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { isPending, user, error } = useUser();

  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [navigate, error]);

  // Yüklenme durumu varsa spinner göster
  if (isPending) {
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );
  }

  // Kullanıcı varsa children döndür
  if (user) {
    return children;
  }

  // Kullanıcı yoksa boş bir değer döndür (navigate işlemi olacak)
  return null;
}

export default ProtectedRoute;
