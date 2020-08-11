function validatePagination(number) {
  return Number.isInteger(Number(number)) && number >= 0;
}

module.exports = validatePagination;