/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledFilter = styled.div`
  && {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const FilterButton = styled.button`
  && {
    border: none;
    background: var(--color-primary);
    color: var(--color-white);
    padding: 0.5rem 1rem;

    &:disabled {
      background-color: var(--color-secondary);
      color: var(--color-primary);
    }
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField);

  const [currentOperator, currentValue] = currentFilter
    ? currentFilter.split(":")
    : [null, null];

  function handleClick(value) {
    const selectedOption = options.find((option) => option.value === value);

    // Eğer "all" seçilmişse, filtreyi açıkça "all" olarak ayarla
    const newFilterValue =
      value === "all" ? "all" : `${selectedOption?.operator || ""}:${value}`;

    // Filtreyi ayarla veya kaldır
    if (newFilterValue) {
      searchParams.set(filterField, newFilterValue);
    } else {
      searchParams.delete(filterField); // Filtreyi kaldır
    }

    searchParams.set("page", 1); // Sayfa sıfırlama
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options?.map((option) => {
        const isActive =
          option.value === currentValue ||
          (option.value === "all" && currentFilter === "all");

        return (
          <FilterButton
            key={option.value}
            onClick={() => handleClick(option.value)}
            $active={isActive}
            disabled={isActive}
          >
            {option.label}
          </FilterButton>
        );
      })}
    </StyledFilter>
  );
}

export default Filter;
