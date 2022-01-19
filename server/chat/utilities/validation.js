const checkPaginationQuery = (limit, offset) => {
  return !parseInt(limit) || parseInt(limit) === 0 || parseInt(offset) == NaN;
};

module.exports = { checkPaginationQuery };
