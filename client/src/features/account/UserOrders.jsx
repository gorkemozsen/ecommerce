import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OrderTableOperations from "../dashboard/Orders/OrderTableOperations";
import { useUserOrders } from "../order/useUserOrders";
import OrderRow from "./OrdersRow";

function UserOrders() {
  const { orders, isPending, error, numPages, numResults, currentPage } =
    useUserOrders();

  console.log(orders);

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  if (error) return <p>{error.message}</p>;

  if (!isPending) console.log(orders);

  return (
    <div>
      <Table columns="0.5fr 1fr 1.5fr 1fr 1.5fr 1.5fr">
        <OrderTableOperations />
        <Table.Header>
          <div>ID</div>
          <div>Items</div>
          <div>Date</div>
          <div>Total</div>
          <div>Status</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={orders}
          render={(order) => <OrderRow order={order} key={order.id} />}
        />
      </Table>

      <Pagination
        numPages={numPages}
        numResults={numResults}
        currentPage={currentPage}
      />
    </div>
  );
}

export default UserOrders;
