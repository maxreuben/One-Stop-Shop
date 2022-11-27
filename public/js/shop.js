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
};

async function updateProducts() {
  const queryString = Object.entries(filters)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const resp = await fetch(`/search?${queryString}`);
  const json = await resp.json();
  const productDiv = document.getElementById("products");
  while (productDiv.firstChild) {
    productDiv.removeChild(productDiv.firstChild);
  }
  json.forEach((prodObj) => {
    productDiv.appendChild(renderProductCard(prodObj));
  });
}

async function addFilter(filterUpdate) {
  filters = { ...filters, ...filterUpdate };
  Object.entries(filters).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      delete filters[key];
    }
  });
  await updateProducts();
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
  await addFilter({ priceMinimum: min, priceMaximum: max });
  setActiveInGroup("#price-filter", self);
}

async function setRatingFilter(self, minRating) {
  await addFilter({ reviewMinimum: minRating });
  setActiveInGroup("#rating-filter", self);
}

async function setOrderBy(self, orderBy) {
  const ascending = filters.orderBy === orderBy && !filters.ascending;
  await addFilter({
    orderBy,
    ascending,
  });
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
}

window.onload = async () => {
  await updateProducts();
};
