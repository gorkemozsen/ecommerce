const { Op } = require("sequelize");

const generateSearchConditions = (
  query,
  searchableFields,
  operator = "like"
) => {
  if (!query || !searchableFields || searchableFields.length === 0) return {};

  const sequelizeOperator =
    {
      eq: Op.eq,
      ne: Op.ne,
      like: Op.like,
      notLike: Op.notLike,
      in: Op.in,
      notIn: Op.notIn,
    }[operator] || Op.like; // Varsayılan olarak `like` kullan

  // Alanlara göre arama koşulları oluştur
  return {
    [Op.or]: searchableFields.map((field) => {
      // İlişkili model alanları için `$alias.field$` formatını kontrol et
      const isAssociationField = field.includes(".");
      const searchField = isAssociationField ? `$${field}$` : field;

      return {
        [searchField]: {
          [sequelizeOperator]:
            sequelizeOperator === Op.like ? `%${query}%` : query,
        },
      };
    }),
  };
};

module.exports = generateSearchConditions;
