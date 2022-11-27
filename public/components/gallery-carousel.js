const getActiveDiv = () =>
  document.querySelector(".gallery-carousel-gallery > div[class *= 'active']");
function nextCarouselImage() {
  const activeDiv = getActiveDiv();
  const nextDiv =
    activeDiv.nextElementSibling ?? activeDiv.parentElement.firstElementChild;
  transitionCarousel(activeDiv, nextDiv);
}
function prevCarouselImage() {
  const activeDiv = getActiveDiv();
  const nextDiv =
    activeDiv.previousElementSibling ??
    activeDiv.parentElement.lastElementChild;
  transitionCarousel(activeDiv, nextDiv);
}

/**
 * Moves the carousel to a new image. Sets the viewport image as well
 * @param {Element} curr - the current active element (from getActiveDiv())
 * @param {Element} next - the next active element
 */
function transitionCarousel(curr, next) {
  curr.classList.remove("active");
  next.classList.add("active");
  const el = document.getElementsByClassName("gallery-carousel-viewport");
  const imgEl = el[0].firstElementChild;
  imgEl.src = next.firstElementChild.src;
}
