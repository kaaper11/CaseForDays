export function filterItems(items, filters) {
  let result = [...items];

  result = result.filter(item => {
    if (
        filters.name &&
        !item.name?.toLowerCase().includes(filters.name.toLowerCase().trim())
    ) return false;

    if (
        filters.type &&
        item.type?.toLowerCase().trim() !== filters.type.toLowerCase().trim()
    ) return false;

    if (
        filters.rarity &&
        item.rarity?.toLowerCase().trim() !== filters.rarity.toLowerCase().trim()
    ) return false;

    if (
        filters.stan &&
        item.stan?.toLowerCase().trim() !== filters.stan.toLowerCase().trim()
    ) return false;

    if (
        filters.maxPrice &&
        item.price > Number(filters.maxPrice)
    ) return false;

    return true;
  });

  if (filters.sort === "price-asc")
    result.sort((a, b) => a.price - b.price);

  if (filters.sort === "price-desc")
    result.sort((a, b) => b.price - a.price);

  return result;
}


export function filterCases(cases, filters) {
  let result = [...cases];

  result = result.filter(c => {
    if (
        filters.name &&
        !c.name?.toLowerCase().includes(filters.name.toLowerCase().trim())
    ) return false;

    if (
        filters.type &&
        c.type?.toLowerCase().trim() !== filters.type.toLowerCase().trim()
    ) return false;

    if (
        filters.maxPrice &&
        c.price > Number(filters.maxPrice)
    ) return false;

    return true;
  });

  if (filters.sort === "price-asc")
    result.sort((a, b) => a.price - b.price);

  if (filters.sort === "price-desc")
    result.sort((a, b) => b.price - a.price);

  return result;
}
