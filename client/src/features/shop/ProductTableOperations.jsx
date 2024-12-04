import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function ProductTableOperations() {
  return (
    <TableOperations className="justify-content-center justify-content-sm-between">
      <Filter
        filterField="stock"
        options={[
          { value: "all", label: "All" },
          { value: "in-stock", label: "Only with stock", operator: "gt" },
          { value: "out-stock", label: "Only out stock", operator: "lte" },
        ]}
      />

      <SortBy
        options={[
          { value: "price-desc", label: "Sort by price (high first)" },
          { value: "price-asc", label: "Sort by price (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default ProductTableOperations;
