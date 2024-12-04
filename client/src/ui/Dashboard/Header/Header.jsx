import { BiChevronDown, BiSearch } from "react-icons/bi";
import StyledHeader from "./Header.styles";
import { useUser } from "../../../features/authentication/useUser";
import Spinner from "../../Spinner";

function Header() {
  const { user, isPending } = useUser();

  return (
    <StyledHeader className="d-flex justify-content-end gap-5  justify-content-md-between align-items-center">
      <form>
        <label>
          <BiSearch />
          <input
            className="d-none d-md-block"
            type="text"
            placeholder="Start typing to search..."
          />
        </label>
      </form>

      {isPending ? (
        <Spinner size={25} />
      ) : (
        <div className="user d-flex align-items-center">
          <img
            height="50"
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          />
          <p className="d-none d-md-block">
            Hi,
            <span> {user?.firstName}</span>
            <BiChevronDown />
          </p>
        </div>
      )}
    </StyledHeader>
  );
}

export default Header;
