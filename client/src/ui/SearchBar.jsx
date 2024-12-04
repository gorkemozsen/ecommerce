import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSearchBar = styled.form`
  && {
    & input {
      padding: 1rem 1.5rem;
      border: none;
      border-radius: 5px;
      &:focus {
        outline: solid 2px var(--color-secondary);
      }
    }
    & svg {
      font-size: 32px;
    }
  }
`;

function SearchBar({ forWhat }) {
  const { register, handleSubmit, reset } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearch(data, event) {
    event.preventDefault();
    const query = data.query.trim();
    if (query) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("query", query);
        newParams.delete("page");
        return newParams;
      });
    } else {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("query");
        return newParams;
      });
    }
    reset();
  }
  return (
    <StyledSearchBar
      onSubmit={handleSubmit((data, event) => handleSearch(data, event))}
      className="p-3 "
    >
      <label className="d-flex gap-3 align-items-center">
        <BiSearch />
        <input
          type="text"
          placeholder={`Search for ${forWhat}...`}
          {...register("query")}
        />
      </label>
    </StyledSearchBar>
  );
}

export default SearchBar;
