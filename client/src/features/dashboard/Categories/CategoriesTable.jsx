import Error from "../../../ui/Error";
import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import CategoryRow from "./CategoryRow";
import { useCategories } from "./useCategories";

function CategoriesTable() {
  const { isPending, categories, error } = useCategories();

  if (isPending)
    return (
      <Spinner.Container>
        <Spinner />
      </Spinner.Container>
    );

  if (error) return <Error>Error: {error.message}</Error>;
  if (!categories.length) return <Error>No Results...</Error>;

  console.log(categories);

  return (
    <>
      <Table columns="0.5fr 2.5fr 0.5fr 1fr">
        <Table.Header>
          <div>ID</div>
          <div>Category</div>
          <div>Parent Id</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={categories}
          render={(category) => (
            <CategoryRow category={category} key={category.id} />
          )}
        />
      </Table>
    </>
  );
}

export default CategoriesTable;
