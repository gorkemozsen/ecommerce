const generateOrder = (sortBy) => {
  const sortField = sortBy.field || "id";
  const sortDirection = sortBy.direction || "desc";

  const order = [[sortField, sortDirection.toLowerCase()]];

  if (!sortBy) return { sortField: "total", sortDirection: "desc" };

  return order;
};

module.exports = generateOrder;
