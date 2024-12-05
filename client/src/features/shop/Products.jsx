import { useProducts } from "./useProducts";

import ProductCard from "../../ui/ProductCard";
import ProductList from "../../ui/ProductList";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import ProductTableOperations from "./ProductTableOperations";
import Error from "../../ui/Error";

function Products() {
  const { isPending, products, error, numPages, numResults, currentPage } =
    useProducts();

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );
  if (error) return <Error>Error: {error.message}</Error>;

  if (!products?.length) return <Error>No Results...</Error>;

  return (
    <>
      <ProductList className="d-flex flex-wrap justify-content-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </ProductList>

      <Pagination
        numResults={numResults}
        numPages={numPages}
        currentPage={currentPage}
      />
    </>
  );
}

export default Products;
