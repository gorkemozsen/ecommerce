import Seperator from "../../../ui/Seperator";

import DashboardWrapper from "../../../ui/DashboardWrapper";
import SearchBar from "../../../ui/SearchBar";
import CategoriesTable from "./CategoriesTable";
import AddCategory from "../Products/AddCategory";

function Categories() {
  return (
    <DashboardWrapper className="dashboard">
      <div className="d-flex flex-column align-items-md-stretch align-items-center gap-3">
        <h1>Categories Dashboard</h1>
        <p>Categories are shown in the table below.</p>

        <Seperator $bg="var(--color-white-bg)" />

        <div className="table-bar d-flex flex-wrap gap-2 align-items-center justify-content-center justify-content-md-between">
          <SearchBar forWhat={"category"} />

          <AddCategory />
        </div>
      </div>
      <CategoriesTable />
    </DashboardWrapper>
  );
}

export default Categories;
