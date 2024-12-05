import { useProducts } from "../../shop/useProducts";

import Pagination from "../../../ui/Pagination";
import Table from "../../../ui/Table";
import ProductRow from "./ProductRow";
import Spinner from "../../../ui/Spinner";
import Error from "../../../ui/Error";

function ProductsTable() {
  const { isPending, products, error, numPages, numResults, currentPage } =
    useProducts();

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  if (error) return <Error>Error: {error.message}</Error>;
  if (!products.length) return <Error>No Results...</Error>;

  return (
    <>
      <Table columns="0.5fr 2fr 1.5fr 0.5fr 0.5fr 1fr">
        <Table.Header>
          <div></div>
          <div>Product</div>
          <div>Price</div>
          <div>Stock</div>
          <div></div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow product={product} key={product.id} />
          )}
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

export default ProductsTable;
