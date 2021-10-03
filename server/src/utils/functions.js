export function filterArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter((item) => {
    return filterKeys.every((key) => {
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}
