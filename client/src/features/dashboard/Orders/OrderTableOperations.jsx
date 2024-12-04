import Filter from "../../../ui/Filter";
import SortBy from "../../../ui/SortBy";
import TableOperations from "../../../ui/TableOperations";

function OrderTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Only pending" },
          { value: "confirmed", label: "Only confirmed" },
          { value: "shipped", label: "Only shipped" },
          { value: "delivered", label: "Only delivered" },
          { value: "cancelled", label: "Only cancelled" },
        ]}
      />

      <SortBy
        options={[
          { value: "total-desc", label: "Sort by total (high first)" },
          { value: "total-asc", label: "Sort by total (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default OrderTableOperations;
