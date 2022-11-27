/**
 * Generates html for rating out of 5 stars using half-star if necessary
 * @param {number | null} rating
 * @return {string} - html string (div parent of 5 star icons)
 */
function getStarRating(rating) {
  if (rating === null) {
    return '<div class="rating">No Rating</div>';
  }
  let html = '<div class="rating">';
  for (let i = 0; i < Math.floor(rating); i++)
    html += '<i class="bx bxs-star"></i>';
  if (Math.floor(rating) !== rating) html += '<i class="bx bxs-star-half"></i>';
  for (let i = Math.ceil(rating); i < 5; i++)
    html += '<i class="bx bx-star"></i>';

  html += "</div>";
  return html;
}

/**
 * Generates product card html
 * @param {Product} product
 * @return {HTMLElement}
 */
function renderProductCard(product) {
  const linkElement = document.createElement("a");
  linkElement.href = `/product/${product.id}`;
  linkElement.innerHTML = `<div class="product-card">
        <div class="product-card-top">
            <img src="${product.image[0]}" alt="${product.name}">
        </div>
        <div class="product-card-bottom">
            <h4>${product.name}</h4>
            <div>
                <span class="price">$${product.retailPrice}</span>
            </div>
            ${getStarRating(product.rating)}
        </div>
    </div>`;
  return linkElement;
}

let filters = {
  priceMinimum: 0,
  pageSize: 50,
  page: 1,
  getQueryString: (excludeArr) =>
    Object.entries(filters)
      .filter(
        ([key, value]) =>
          !["getQueryString", ...(excludeArr ?? [])].includes(key) &&
          Boolean(value)
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&"),
};

const columnOccurrenceCounts = {};

/**
 * Updates a column occurrence list, like brand or category
 * @param {string} column - the column to get counts for
 * @param {string} filterGroupId - the id of the parent to add the values to
 * @param {boolean} [reset] - reset the count back to 5
 * @return {Promise<void>}
 */
async function loadDynamicFilters(column, filterGroupId, reset) {
  // increment count if loading more
  const { [column]: currentCount } = columnOccurrenceCounts;
  columnOccurrenceCounts[column] =
    !currentCount || reset ? 5 : currentCount + 5;

  // fetch new values
  const response = await fetch(
    `/topValues?column=${column}&count=${
      columnOccurrenceCounts[column]
    }&${filters.getQueryString([column])}`
  );
  const json = await response.json();

  const parentDiv = document.querySelector(filterGroupId);
  // remove old column values
  while (parentDiv.children.length > 1) {
    parentDiv.removeChild(parentDiv.children[1]);
  }

  // add new column values
  for (let i = 0; i < json.length; i++) {
    const { value, count } = json[i];
    const div = document.createElement("div");
    div.className = "filter-button";
    // make sure button is active if necessary
    if (filters[column] === value) {
      div.className += " active";
    }
    div.onclick = async () => {
      filters[column] = value;
      setActiveInGroup(filterGroupId, div);
      await updateProducts([column]);
    };
    div.innerHTML = `<span class="column-value">${value}</span> <span class="column-count">(${count})</span>`;
    parentDiv.appendChild(div);
  }

  // remove filter if the option no longer exists
  if (!json.find((val) => val.value === filters[column]) && filters[column]) {
    delete filters[column];
  }
}

/**
 * Updated page navigation based on new count and current page.
 * Uses the filters object for pageSize and current page
 * @param count - the total count, used to calculate number of pages
 * @return {Promise<void>}
 */
async function updatePageNav(count) {
  const { page, pageSize } = filters;
  const numPages = Math.ceil(count / pageSize);
  const startPage = Math.max(1, page - 3);
  const endPage = Math.min(numPages, page + 3);

  // we have multiple navigations on the same page
  const pageNavPages = document.getElementsByClassName("page-nav-pages");
  for (const parent of pageNavPages) {
    // delete all nav children and clear chevron actions
    while (parent.firstChild) parent.firstChild.remove();
    parent.previousElementSibling.onclick = () => {};
    parent.nextElementSibling.onclick = () => {};

    for (let i = startPage; i <= endPage; i++) {
      const div = document.createElement("div");
      div.className = "icon-button";
      if (i === page) div.classList.add("active");
      div.innerText = i.toString();
      div.onclick = () => addFilter({ page: i });
      parent.appendChild(div);

      // set chevron actions
      if (i === page - 1) parent.previousElementSibling.onclick = div.onclick;
      if (i === page + 1) parent.nextElementSibling.onclick = div.onclick;
    }
  }

  const fmt = (num) => num.toLocaleString();
  document.getElementById("product-count").innerText = `Showing ${fmt(
    (page - 1) * pageSize + 1
  )}-${fmt(Math.min(count, pageSize * page))} of ${fmt(count)} products`;
}

/**
 * Updates the search page, skipping an update if need be to prevent infinite recursion
 * @param {string[]} [updatedFilters] - the filters that were just updated ('priceMinimum', etc.)
 * @return {Promise<void>}
 */
async function updateProducts(updatedFilters) {
  // update dynamic filters
  if (!updatedFilters?.includes("category"))
    await loadDynamicFilters("category", "#category-filter", true);
  if (!updatedFilters?.includes("brand"))
    await loadDynamicFilters("brand", "#brand-filter", true);

  // reset page if need be
  if (!updatedFilters?.includes("page") && filters.page !== 1) {
    filters.page = 1;
  }

  // update products using remaining filters (some may be removed loading dynamic filters)
  const resp = await fetch(`/search?${filters.getQueryString()}`);
  const { products, count } = await resp.json();
  const productDiv = document.getElementById("products");
  while (productDiv.firstChild) {
    productDiv.removeChild(productDiv.firstChild);
  }
  products.forEach((prodObj) => {
    productDiv.appendChild(renderProductCard(prodObj));
  });
  await updatePageNav(count);
}

async function addFilter(filterUpdate) {
  filters = { ...filters, ...filterUpdate };
  Object.entries(filters).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      delete filters[key];
    }
  });
  await updateProducts(Object.keys(filterUpdate));
}

function buttonsInGroup(parentId) {
  return document.querySelectorAll(`${parentId} > .filter-button`);
}

function setActiveInGroup(parentId, el) {
  buttonsInGroup(parentId).forEach((button) => {
    button.classList.remove("active");
  });
  el.classList.add("active");
}

async function setPriceFilter(self, min, max) {
  setActiveInGroup("#price-filter", self);
  await addFilter({ priceMinimum: min, priceMaximum: max });
}

async function setRatingFilter(self, minRating) {
  setActiveInGroup("#rating-filter", self);
  await addFilter({ reviewMinimum: minRating });
}

async function setOrderBy(self, orderBy) {
  const ascending = filters.orderBy === orderBy && !filters.ascending;
  setActiveInGroup("#sort-selector", self);
  if (ascending) {
    self.classList.add("up");
    self.classList.remove("down");
  } else {
    buttonsInGroup("#sort-selector").forEach((e) => {
      e.classList.remove("down");
      e.classList.remove("up");
    });
    self.classList.add("down");
  }
  await addFilter({
    orderBy,
    ascending,
  });
}

async function setQuery() {
  const searchBar = document.getElementById("search-bar");
  await addFilter({ searchQuery: searchBar.value });
}

window.onload = async () => {
  const searchBar = document.getElementById("search-bar");
  await setQuery(); // if you reload the page, the search bar still has text in it, this will immediately instantiate the filters with the query string
  searchBar.onkeydown = (e) => {
    if (e.key === "Enter") {
      setQuery();
    }
  };
  const searchButton = document.querySelector("#search-bar-wrapper > i");
  searchButton.onclick = setQuery;
};
