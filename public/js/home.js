async function getProductsInCategory(category) {
  let html = "";
  const resp = await fetch(`/search?pageSize=10&category=${category}`);
  const { products } = await resp.json();

  const classesForStar = (starIndex, rating) => {
    const ratingBad = rating === null || rating === undefined;
    const isEmpty = ratingBad || rating <= starIndex;
    const isHalf = !ratingBad && rating > starIndex && rating < starIndex + 1;
    return `bx bx${isEmpty ? "" : "s"}-star${isHalf ? "-half" : ""}`;
  };

  for (const product of products) {
    if (product.category === category) {
      html += `
              <div class="product category-product">
                <div class="top d-flex">
                  <img src=${product.image[0]} alt="" />
                  <div class="icon d-flex">
                    <i class="bx bxs-heart"></i>
                  </div>
                </div>
                <div class="bottom">
                  <h4>${product.name}</h4>
                  <div class="d-flex">
                    <div class="price">$${product.retailPrice}</div>
                    <div class="rating">
                      <i class="${classesForStar(0, product.rating)}"></i>
                      <i class="${classesForStar(1, product.rating)}"></i>
                      <i class="${classesForStar(2, product.rating)}"></i>
                      <i class="${classesForStar(3, product.rating)}"></i>
                      <i class="${classesForStar(4, product.rating)}"></i>
                    </div>
                  </div>
                </div>
              </div>
            `;
    }
  }
  document.getElementById("products").innerHTML = html;
  for (const filterEl of document.getElementsByClassName("category-filter")) {
    filterEl.classList.remove("active");
  }
  const activeCategoryButton = document.getElementById(`${category}-filter`);
  if (activeCategoryButton) {
    activeCategoryButton.classList.add("active");
  }
  activeElementIndex = -1;
  setCategoryCarouselActiveIndex(0);
}

let activeElementIndex = -1;

function shiftCategoryCarouselActiveIndex(shiftAmount) {
  setCategoryCarouselActiveIndex(activeElementIndex + shiftAmount);
}

function setCategoryCarouselActiveIndex(index) {
  let categoryProducts = document.getElementsByClassName("category-product");
  if (activeElementIndex >= 0) {
    categoryProducts.item(activeElementIndex).classList.remove("active");
  }
  activeElementIndex = index % categoryProducts.length;
  if (activeElementIndex < 0) {
    activeElementIndex += categoryProducts.length;
  }
  categoryProducts.item(activeElementIndex).classList.add("active");
}

window.onload = async () => {
  let categoryFilters = document.getElementsByClassName("category-filter");
  if (categoryFilters.length > 0) {
    await getProductsInCategory(categoryFilters.item(0).innerHTML);
  }
};
