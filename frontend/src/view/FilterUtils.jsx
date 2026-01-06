// =======================
// PRZEDMIOTY (ITEMS)
// =======================
export function filterItems(items, filters) {
  let result = [...items];

  result = result.filter(item => {
    // 🔹 NAZWA
    if (
      filters.name &&
      !item.name.toLowerCase().includes(filters.name.toLowerCase().trim())
    ) {
      return false;
    }

    // 🔹 TYP
    if (
      filters.type &&
      item.type.toLowerCase().trim() !==
        filters.type.toLowerCase().trim()
    ) {
      return false;
    }

    // 🔹 RZADKOŚĆ
    if (
      filters.rarity &&
      item.rarity.toLowerCase().trim() !==
        filters.rarity.toLowerCase().trim()
    ) {
      return false;
    }

    // 🔹 STAN BRONI (TU BYŁ GŁÓWNY BUG)
    if (
      filters.condition &&
      item.condition.toLowerCase().trim() !==
        filters.condition.toLowerCase().trim()
    ) {
      return false;
    }

    // 🔹 MAKSYMALNA CENA
    if (
      filters.maxPrice &&
      item.price > Number(filters.maxPrice)
    ) {
      return false;
    }

    return true;
  });

  // 🔽 SORTOWANIE
  if (filters.sort === "price-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  }

  if (filters.sort === "price-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  return result;
}

// =======================
// SKRZYNKI (CASES)
// =======================
export function filterCases(cases, filters) {
  let result = [...cases];

  result = result.filter(c => {
    // 🔹 NAZWA
    if (
      filters.name &&
      !c.name.toLowerCase().includes(filters.name.toLowerCase().trim())
    ) {
      return false;
    }

    // 🔹 SERIA
    if (
      filters.series &&
      c.series.toLowerCase().trim() !==
        filters.series.toLowerCase().trim()
    ) {
      return false;
    }

    // 🔹 MAKSYMALNA CENA
    if (
      filters.maxPrice &&
      c.price > Number(filters.maxPrice)
    ) {
      return false;
    }

    return true;
  });

  // 🔽 SORTOWANIE
  if (filters.sort === "price-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  }

  if (filters.sort === "price-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  return result;
}
