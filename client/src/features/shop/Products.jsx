import { useProducts } from "./useProducts";

import ProductCard from "../../ui/ProductCard";
import ProductList from "../../ui/ProductList";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import ProductTableOperations from "./ProductTableOperations";

function Products() {
  const { isPending, products, error, numPages, numResults, currentPage } =
    useProducts();

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!products?.length) return <p>No Results...</p>;

  return (
    <>
      <ProductTableOperations />
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
