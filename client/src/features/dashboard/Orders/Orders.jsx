import Seperator from "../../../ui/Seperator";
import OrdersTable from "./OrdersTable";
import OrderTableOperations from "./OrderTableOperations";
import DashboardWrapper from "../../../ui/DashboardWrapper";
import SearchBar from "../../../ui/SearchBar";

function Orders() {
  return (
    <DashboardWrapper className="dashboard">
      <div className="d-flex flex-column align-items-md-stretch align-items-center gap-3">
        <h1>Orders Dashboard</h1>
        <p>Orders are shown in the table below.</p>

        <Seperator $bg="var(--color-white-bg)" />

        <div className="table-bar d-flex align-items-center justify-content-between">
          <SearchBar forWhat="orders" />
        </div>
      </div>
      <OrderTableOperations />
      <OrdersTable />
    </DashboardWrapper>
  );
}

export default Orders;
