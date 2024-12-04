/* eslint-disable react/prop-types */
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FilterButton } from "./Filter";

const StyledPagination = styled.div`
  && {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
    & p {
    }
  }
`;

function Pagination({ numPages, numResults, limit = 10, currentPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!numPages && !numResults) return null;

  function nextPage() {
    const next = currentPage === numPages ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function previousPage() {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", previous);
    setSearchParams(searchParams);
  }

  if (numPages < 1) return null;

  return (
    <StyledPagination>
      <p>
        Showing <span>{(currentPage - 1) * limit + 1} </span> to
        <span>
          {" "}
          {currentPage === numPages ? numResults : currentPage * limit}
        </span>{" "}
        of <span>{numResults} </span>
        results
      </p>

      <div className="btn-bx flex-shrink-0">
        {currentPage !== 1 && (
          <FilterButton disabled={currentPage === 1} onClick={previousPage}>
            <HiChevronLeft />
            <span>Previous</span>
          </FilterButton>
        )}

        {currentPage !== numPages && (
          <FilterButton disabled={currentPage === numPages} onClick={nextPage}>
            <span>Next</span>
            <HiChevronRight />
          </FilterButton>
        )}
      </div>
    </StyledPagination>
  );
}

export default Pagination;
