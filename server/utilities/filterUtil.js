const { Op } = require("sequelize");

const generateFilters = (filter) => {
  if (!filter || !filter.field || !filter.value) return {}; // Geçerli filtre yoksa boş döner

  const operators = {
    eq: Op.eq, // Eşittir
    neq: Op.ne, // Eşit değildir
    gt: Op.gt, // Büyüktür
    gte: Op.gte, // Büyük veya eşittir
    lt: Op.lt, // Küçüktür
    lte: Op.lte, // Küçük veya eşittir
    like: Op.like, // Benzeyen
  };

  const operator = operators[filter.operator] || Op.eq; // Varsayılan: eşittir

  if (filter.field === "stock") {
    return {
      [filter.field]: {
        [operator]: 0,
      },
    };
  }

  return {
    [filter.field]: {
      [operator]: filter.value,
    },
  };
};

module.exports = generateFilters;
