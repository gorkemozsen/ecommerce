import Seperator from "../../../ui/Seperator";
import ProductsTable from "./ProductsTable";
import ProductTableOperations from "../../shop/ProductTableOperations";
import AddProduct from "./AddProduct";
import DashboardWrapper from "../../../ui/DashboardWrapper";
import SearchBar from "../../../ui/SearchBar";

function Products() {
  return (
    <DashboardWrapper className="dashboard">
      <div className="d-flex flex-column align-items-md-stretch align-items-center gap-3">
        <h1>Products Dashboard</h1>
        <p>Your products are shown in the table below.</p>

        <Seperator $bg="var(--color-white-bg)" />

        <div className="table-bar d-flex flex-wrap gap-2 align-items-center justify-content-center justify-content-md-between">
          <SearchBar forWhat={"products"} />

          <AddProduct />
        </div>
      </div>
      <ProductTableOperations />
      <ProductsTable />
    </DashboardWrapper>
  );
}

export default Products;
