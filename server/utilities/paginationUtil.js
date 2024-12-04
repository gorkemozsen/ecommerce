const calculatePagination = (page = 1, limit = 10) => {
  const pageNum = Math.max(parseInt(page, 10) || 1, 1); // Sayfa numarası en az 1 olmalı
  const limitNum = parseInt(limit, 10) || 10; // Varsayılan limit 10
  const offset = (pageNum - 1) * limitNum;

  return { pageNum, limitNum, offset };
};

module.exports = calculatePagination;
