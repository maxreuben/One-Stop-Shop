async function getProductsInCategory(category) {
  let html = "";
  const resp = await fetch(`/search?pageSize=10&category=${category}`);
  const products = await resp.json();
  for (const product of products) {
    if (product.category === category) {
      html += `<div class="swiper-slide">
              <div class="product">
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
                      <i class="bx bxs-star"></i>
                      <i class="bx bxs-star"></i>
                      <i class="bx bxs-star"></i>
                      <i class="bx bxs-star"></i>
                      <i class="bx bxs-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
    }
  }
  document.getElementById("products").innerHTML = html;
}
