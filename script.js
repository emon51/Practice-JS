// MOBILE GALLERY SLIDER
const gallerySlider = document.querySelector(".gallery-slider");
const galleryImages = document.querySelectorAll(".gallery-img");
const dots = document.querySelectorAll(".dot");

let currentGalleryIndex = 0;
let galleryStartX = 0;
let galleryEndX = 0;

function showGalleryImage(index) {
  galleryImages.forEach(img => img.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  
  galleryImages[index].classList.add("active");
  dots[index].classList.add("active");
}

// Dot click navigation
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentGalleryIndex = parseInt(dot.getAttribute("data-index"));
    showGalleryImage(currentGalleryIndex);
  });
});

// Touch swipe for mobile gallery
if (gallerySlider) {
  gallerySlider.addEventListener("touchstart", (e) => {
    galleryStartX = e.touches[0].clientX;
  });

  gallerySlider.addEventListener("touchmove", (e) => {
    galleryEndX = e.touches[0].clientX;
  });

  gallerySlider.addEventListener("touchend", () => {
    const diff = galleryStartX - galleryEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      } else {
        // Swipe right → previous
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      }
      showGalleryImage(currentGalleryIndex);
    }
  });
}

// MODAL CODE (Desktop/Tablet)
const modal = document.getElementById("imageModal");
const viewBtn = document.getElementById("viewAllBtn");
const closeBtn = document.querySelector(".close");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

// Open modal
if (viewBtn) {
  viewBtn.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    showSlide(currentIndex);
    updateModalButtons(); // Add this line
  });
}

// Close modal
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

// Update button states
function updateModalButtons() {
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
}

// Next
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      showSlide(currentIndex);
      updateModalButtons();
    }
  });
}

// Previous
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showSlide(currentIndex);
      updateModalButtons();
    }
  });
}

// SWIPE SUPPORT FOR MODAL (Desktop/Tablet)
let startX = 0;
let endX = 0;

const slider = document.querySelector(".slider-wrapper");

if (slider) {
  // Touch start
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  // Touch move
  slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  });

  // Touch end
  slider.addEventListener("touchend", () => {
    const diff = startX - endX;

    // Minimum swipe distance
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left → next image
        currentIndex = (currentIndex + 1) % slides.length;
      } else {
        // Swipe right → previous image
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      }
      showSlide(currentIndex);
    }
  });
}


// BOOKING FUNCTIONALITY
const pricePerNight = 2026;
const checkInInput = document.getElementById("checkInDate");
const checkOutInput = document.getElementById("checkOutDate");
const totalPriceDisplay = document.getElementById("totalPrice");
const displayPricePerNightElem = document.getElementById("displayPricePerNight");
const pricePerNightElem = document.getElementById("pricePerNight");

// Set initial price
if (pricePerNightElem) pricePerNightElem.textContent = pricePerNight;
if (displayPricePerNightElem) displayPricePerNightElem.textContent = pricePerNight;

function calculateTotalPrice() {
  const checkIn = new Date(checkInInput.value);
  const checkOut = new Date(checkOutInput.value);
  
  if (checkIn && checkOut && checkOut > checkIn) {
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const total = nights * pricePerNight;
    totalPriceDisplay.textContent = total.toLocaleString();
  } else {
    totalPriceDisplay.textContent = pricePerNight.toLocaleString();
  }
}

// Set min date to today and validate dates
function setDateConstraints() {
  const today = new Date().toISOString().split('T')[0];
  checkInInput.setAttribute('min', today);
  
  checkInInput.addEventListener('change', () => {
    const checkInDate = checkInInput.value;
    if (checkInDate) {
      const minCheckOut = new Date(checkInDate);
      minCheckOut.setDate(minCheckOut.getDate() + 1);
      checkOutInput.setAttribute('min', minCheckOut.toISOString().split('T')[0]);
      
      if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(checkInDate)) {
        checkOutInput.value = minCheckOut.toISOString().split('T')[0];
      }
    }
    calculateTotalPrice();
  });
  
  checkOutInput.addEventListener('change', calculateTotalPrice);
}

// Initialize
if (checkInInput && checkOutInput) {
  setDateConstraints();
  calculateTotalPrice();
}

// GUEST MODAL FUNCTIONALITY
// GUEST MODAL FUNCTIONALITY
const guestModal = document.getElementById("guestModal");
const guestSelector = document.getElementById("guestSelector");
const guestClose = document.querySelector(".guest-close");
const guestDisplay = document.getElementById("guestDisplay");

let guests = 3;
let infants = 1;
let pets = 1;

function updateGuestDisplay() {
  let text = [];
  if (guests > 0) text.push(`${guests} Guest${guests !== 1 ? 's' : ''}`);
  if (infants > 0) text.push(`${infants} Infant${infants !== 1 ? 's' : ''}`);
  if (pets > 0) text.push(`${pets} Pet${pets !== 1 ? 's' : ''}`);
  
  if (guestDisplay) {
    guestDisplay.textContent = text.length > 0 ? text.join(', ') : '0 Guests';
  }
}

// Open guest modal
if (guestSelector && guestModal) {
  guestSelector.addEventListener("click", (e) => {
    e.preventDefault();
    guestModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
}

// Close guest modal
if (guestClose && guestModal) {
  guestClose.addEventListener("click", () => {
    guestModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

// Close modal on outside click
if (guestModal) {
  window.addEventListener("click", (e) => {
    if (e.target === guestModal) {
      guestModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// Guest controls
const guestCount = document.getElementById("guestCount");
const infantCount = document.getElementById("infantCount");
const petCount = document.getElementById("petCount");

const guestPlus = document.getElementById("guestPlus");
const guestMinus = document.getElementById("guestMinus");
const infantPlus = document.getElementById("infantPlus");
const infantMinus = document.getElementById("infantMinus");
const petPlus = document.getElementById("petPlus");
const petMinus = document.getElementById("petMinus");

function updateButtons() {
  if (guestMinus) guestMinus.disabled = guests <= 1;
  if (infantMinus) infantMinus.disabled = infants <= 0;
  if (petMinus) petMinus.disabled = pets <= 0;
}

if (guestPlus && guestCount) {
  guestPlus.addEventListener("click", (e) => {
    e.preventDefault();
    guests++;
    guestCount.textContent = guests;
    updateGuestDisplay();
    updateButtons();
  });
}

if (guestMinus && guestCount) {
  guestMinus.addEventListener("click", (e) => {
    e.preventDefault();
    if (guests > 1) {
      guests--;
      guestCount.textContent = guests;
      updateGuestDisplay();
      updateButtons();
    }
  });
}

if (infantPlus && infantCount) {
  infantPlus.addEventListener("click", (e) => {
    e.preventDefault();
    infants++;
    infantCount.textContent = infants;
    updateGuestDisplay();
    updateButtons();
  });
}

if (infantMinus && infantCount) {
  infantMinus.addEventListener("click", (e) => {
    e.preventDefault();
    if (infants > 0) {
      infants--;
      infantCount.textContent = infants;
      updateGuestDisplay();
      updateButtons();
    }
  });
}

if (petPlus && petCount) {
  petPlus.addEventListener("click", (e) => {
    e.preventDefault();
    pets++;
    petCount.textContent = pets;
    updateGuestDisplay();
    updateButtons();
  });
}

if (petMinus && petCount) {
  petMinus.addEventListener("click", (e) => {
    e.preventDefault();
    if (pets > 0) {
      pets--;
      petCount.textContent = pets;
      updateGuestDisplay();
      updateButtons();
    }
  });
}

// Initialize button states and display
updateButtons();
updateGuestDisplay();



// DESCRIPTION SHOW MORE/LESS FUNCTIONALITY
const toggleBtn = document.getElementById("toggleDescription");
const extraText = document.getElementById("descriptionExtra");

if (toggleBtn && extraText) {
  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (extraText.classList.contains("expanded")) {
      // Collapse
      extraText.classList.remove("expanded");
      toggleBtn.textContent = "Show more";
    } else {
      // Expand
      extraText.classList.add("expanded");
      toggleBtn.textContent = "Show less";
    }
  });
}




// MORE VACATION RENTALS - FAVORITE FUNCTIONALITY
const favoriteButtons = document.querySelectorAll('.favorite-btn');

// Load favorites from localStorage
function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favoriteButtons.forEach(btn => {
    const propertyId = btn.getAttribute('data-property');
    if (favorites.includes(propertyId)) {
      btn.classList.add('active');
      btn.querySelector('.heart').textContent = '♥';
    }
  });
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Toggle favorite
favoriteButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const propertyId = btn.getAttribute('data-property');
    const heart = btn.querySelector('.heart');
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (btn.classList.contains('active')) {
      // Remove from favorites
      btn.classList.remove('active');
      heart.textContent = '♡';
      favorites = favorites.filter(id => id !== propertyId);
    } else {
      // Add to favorites
      btn.classList.add('active');
      heart.textContent = '♥';
      favorites.push(propertyId);
    }
    
    saveFavorites(favorites);
  });
});

// Initialize favorites on page load
loadFavorites();