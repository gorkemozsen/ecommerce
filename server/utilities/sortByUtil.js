const generateOrder = (sortBy) => {
  const sortField = sortBy.field || "total";
  const sortDirection = sortBy.direction || "desc";

  const order = [[sortField, sortDirection.toLowerCase()]];

  return order;
};

module.exports = generateOrder;
