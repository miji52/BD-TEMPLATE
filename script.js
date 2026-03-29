const pages = [
  "pages/page01.jpg",
  "pages/page02.jpg",
  "pages/page03.jpg"
];

const pageImage = document.getElementById("pageImage");
const pageOverlay = document.getElementById("pageOverlay");
const prevZone = document.getElementById("prevZone");
const nextZone = document.getElementById("nextZone");
const homeBtn = document.getElementById("homeBtn");

const STORAGE_KEY = "comicCurrentPage";

let currentPage = parseInt(localStorage.getItem(STORAGE_KEY), 10);

if (isNaN(currentPage) || currentPage < 0 || currentPage >= pages.length) {
  currentPage = 0;
}

function preloadImages() {
  pages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function savePage() {
  localStorage.setItem(STORAGE_KEY, currentPage);
}

function renderPage() {
  pageImage.src = pages[currentPage];
  pageImage.alt = `Page ${currentPage + 1}`;
  savePage();
}

function animateTurn(direction) {
  pageOverlay.classList.remove("turn-next", "turn-prev");
  void pageOverlay.offsetWidth;

  if (direction === "next") {
    pageOverlay.classList.add("turn-next");
  } else {
    pageOverlay.classList.add("turn-prev");
  }
}

function nextPage() {
  if (currentPage < pages.length - 1) {
    animateTurn("next");
    currentPage += 1;
    renderPage();
  } else {
    window.location.href = "end.html";
  }
}

function prevPage() {
  if (currentPage > 0) {
    animateTurn("prev");
    currentPage -= 1;
    renderPage();
  }
}

prevZone.addEventListener("click", prevPage);
nextZone.addEventListener("click", nextPage);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextPage();
  } else if (event.key === "ArrowLeft") {
    prevPage();
  }
});

homeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const delta = touchEndX - touchStartX;

  if (Math.abs(delta) < 50) return;

  if (delta < 0) {
    nextPage();
  } else {
    prevPage();
  }
}

preloadImages();
renderPage();
