import Pagination from "../../../ui/Pagination";
import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import OrderRow from "./OrderRow";
import { useOrders } from "./useOrders";

function OrdersTable() {
  const { isPending, orders, error, numPages, numResults, currentPage } =
    useOrders();
  console.log(orders, numResults);

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!orders.length) return <p>No Results...</p>;
  return (
    <>
      <Table columns="1fr 1fr 1fr 1fr 1fr 0.5fr 1fr">
        <Table.Header>
          <div>Order</div>
          <div>Items</div>
          <div>Total</div>
          <div>Date</div>
          <div>Status</div>
          <div>CreatedBy</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={orders}
          render={(order) => <OrderRow order={order} key={order.id} />}
        />
      </Table>

      <Pagination
        numResults={numResults}
        numPages={numPages}
        currentPage={currentPage}
      />
    </>
  );
}

export default OrdersTable;
