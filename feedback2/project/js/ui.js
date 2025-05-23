// UI related functions

// Current language
let currentLang = 'en';

// Current page for pagination
let currentPage = 1;
const doctorsPerPage = 6;

// Initialize UI
function initUI() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
  
  // Language selector
  const langButtons = document.querySelectorAll('.language-btn');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      
      // Update active class
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  
  // Modal close buttons
  const closeButtons = document.querySelectorAll('.close-modal');
  
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });
  
  // Close modal when clicking outside content
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });
  
  // Initialize search and filters
  const searchInput = document.getElementById('search-input');
  const specialtyFilter = document.getElementById('specialty-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const searchBtn = document.querySelector('.search-btn');
  
  searchBtn.addEventListener('click', () => {
    filterDoctors();
  });
  
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      filterDoctors();
    }
  });
  
  specialtyFilter.addEventListener('change', filterDoctors);
  ratingFilter.addEventListener('change', filterDoctors);
  
  // Pagination
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderDoctors();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(getFilteredDoctors().length / doctorsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderDoctors();
    }
  });
}

// Set language
function setLanguage(lang) {
  currentLang = lang;
  updateUIText();
  renderDoctors();
}

// Update UI text based on selected language
function updateUIText() {
  const t = translations[currentLang];
  
  // Navigation
  document.querySelectorAll('.main-nav li a')[0].textContent = t.navHome;
  document.querySelectorAll('.main-nav li a')[1].textContent = t.navDoctors;
  document.querySelectorAll('.main-nav li a')[2].textContent = t.navSpecialties;
  document.querySelectorAll('.main-nav li a')[3].textContent = t.navAbout;
  
  // Hero section
  document.querySelector('.hero-title').textContent = t.heroTitle;
  document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
  document.getElementById('search-input').placeholder = t.searchPlaceholder;
  document.querySelector('.search-btn').textContent = t.searchButton;
  
  // Filters
  document.querySelector('#specialty-filter option:first-child').textContent = t.allSpecialties;
  document.querySelector('#rating-filter option:first-child').textContent = t.allRatings;
  
  // Section titles
  document.querySelector('.doctors-section .section-title').textContent = t.topRatedDoctors;
  document.querySelector('.doctors-section .section-subtitle').textContent = t.topRatedSubtitle;
  document.querySelector('.featured-section .section-title').textContent = t.featuredSpecialties;
  
  // Pagination
  document.getElementById('prev-page').innerHTML = `<i class="fas fa-chevron-left"></i> ${t.previousPage}`;
  document.getElementById('next-page').innerHTML = `${t.nextPage} <i class="fas fa-chevron-right"></i>`;
  
  // Update page indicator
  updatePageIndicator();
  
  // Footer links
  document.querySelectorAll('.footer-links ul li a')[0].textContent = t.navHome;
  document.querySelectorAll('.footer-links ul li a')[1].textContent = t.navDoctors;
  document.querySelectorAll('.footer-links ul li a')[2].textContent = t.navSpecialties;
  document.querySelectorAll('.footer-links ul li a')[3].textContent = t.navAbout;
}

// Update page indicator text
function updatePageIndicator() {
  const t = translations[currentLang];
  const totalPages = Math.ceil(getFilteredDoctors().length / doctorsPerPage);
  document.getElementById('page-indicator').textContent = `${t.pageIndicator} ${currentPage} ${t.of} ${totalPages}`;
}

// Get filtered doctors based on search and filters
function getFilteredDoctors() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const specialty = document.getElementById('specialty-filter').value;
  const rating = parseFloat(document.getElementById('rating-filter').value) || 0;
  
  return doctorsData.filter(doctor => {
    const nameMatch = doctor.name.toLowerCase().includes(searchTerm);
    const specialtyMatch = doctor.specialty.toLowerCase().includes(searchTerm);
    const specialtyFilterMatch = !specialty || doctor.specialty.toLowerCase() === specialty.toLowerCase();
    const ratingMatch = doctor.rating >= rating;
    
    return (nameMatch || specialtyMatch) && specialtyFilterMatch && ratingMatch;
  });
}

// Filter doctors based on search and filters
function filterDoctors() {
  currentPage = 1;
  renderDoctors();
}

// Render doctors grid
function renderDoctors() {
  const doctorsGrid = document.getElementById('doctors-grid');
  const filteredDoctors = getFilteredDoctors();
  const t = translations[currentLang];
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const displayedDoctors = filteredDoctors.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  
  // Update pagination buttons
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
  
  // Update page indicator
  updatePageIndicator();
  
  // Clear existing doctors
  doctorsGrid.innerHTML = '';
  
  // If no doctors match the filters
  if (displayedDoctors.length === 0) {
    doctorsGrid.innerHTML = `
      <div class="no-results">
        <p>No doctors found matching your criteria. Please try different search terms or filters.</p>
      </div>
    `;
    return;
  }
  
  // Add doctor cards
  displayedDoctors.forEach(doctor => {
    const card = document.createElement('div');
    card.className = 'doctor-card';
    
    // Create availability indicators
    const availabilityHTML = doctor.availability
      .slice(0, 5) // Show only weekdays
      .map(day => {
        const dayClass = day.available ? 'available' : '';
        return `<div class="day-indicator ${dayClass}" title="${day.available ? `${t.available}: ${day.hours}` : t.notAvailable}">${t.days[day.day]}</div>`;
      })
      .join('');
    
    // Create star rating
    const starsHTML = generateStarRating(doctor.rating);
    
    card.innerHTML = `
      <div class="doctor-image">
        <img src="${doctor.image}" alt="${doctor.name}">
      </div>
      <div class="doctor-info">
        <h3 class="doctor-name">${doctor.name}</h3>
        <p class="doctor-specialty">
          <i class="fas fa-${doctor.specialtyIcon}"></i> ${doctor.specialty}
        </p>
        <div class="doctor-rating">
          <div class="stars">
            ${starsHTML}
          </div>
          <span class="count">(${doctor.reviewCount} ${t.reviewsCount})</span>
        </div>
        <div class="availability-preview">
          ${availabilityHTML}
        </div>
        <div class="doctor-actions">
          <button class="view-profile" data-id="${doctor.id}">${t.viewProfile}</button>
          <button class="add-review" data-id="${doctor.id}">${t.addReview}</button>
        </div>
      </div>
    `;
    
    doctorsGrid.appendChild(card);
  });
  
  // Add event listeners to buttons
  attachDoctorCardListeners();
}

// Generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // Half star
  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

// Attach event listeners to doctor card buttons
function attachDoctorCardListeners() {
  // View profile buttons
  document.querySelectorAll('.view-profile').forEach(btn => {
    btn.addEventListener('click', () => {
      const doctorId = parseInt(btn.dataset.id);
      const doctor = doctorsData.find(d => d.id === doctorId);
      
      if (doctor) {
        showDoctorDetails(doctor);
      }
    });
  });
  
  // Add review buttons
  document.querySelectorAll('.add-review').forEach(btn => {
    btn.addEventListener('click', () => {
      const doctorId = parseInt(btn.dataset.id);
      showReviewForm(doctorId);
    });
  });
}

// Show doctor details in modal
function showDoctorDetails(doctor) {
  const modal = document.getElementById('doctor-modal');
  const detailsContainer = document.getElementById('doctor-details');
  const t = translations[currentLang];
  
  // Generate weekly schedule HTML
  const scheduleHTML = doctor.availability.map(day => {
    return `
      <div class="day-schedule">
        <div class="day-name">${t.days[day.day]}</div>
        <div class="day-availability ${day.available ? 'available' : 'not-available'}">
          ${day.available ? day.hours : t.notAvailable}
        </div>
      </div>
    `;
  }).join('');
  
  // Generate reviews HTML
  const reviewsHTML = doctor.reviews.map(review => {
    return `
      <div class="review-item">
        <div class="review-header">
          <div class="reviewer-name">${review.name}</div>
          <div class="review-date">${review.date}</div>
        </div>
        <div class="review-rating">
          ${generateStarRating(review.rating)}
        </div>
        <div class="review-text">${review.text}</div>
      </div>
    `;
  }).join('');
  
  // Format languages
  const languagesText = doctor.languages.join(', ');
  
  detailsContainer.innerHTML = `
    <div class="doctor-profile">
      <div class="doctor-profile-image">
        <img src="${doctor.image}" alt="${doctor.name}">
      </div>
      <div class="doctor-profile-info">
        <h2 class="doctor-profile-name">${doctor.name}</h2>
        <p class="doctor-profile-specialty">
          <i class="fas fa-${doctor.specialtyIcon}"></i> ${doctor.specialty}
        </p>
        <div class="doctor-profile-rating">
          <div class="stars">
            ${generateStarRating(doctor.rating)}
          </div>
          <span class="score">${doctor.rating}</span>
          <span class="count">(${doctor.reviewCount} ${t.reviewsCount})</span>
        </div>
        <p class="doctor-bio">${doctor.bio}</p>
        <div class="doctor-profile-details">
          <div class="detail-item">
            <div class="detail-label">${t.education}:</div>
            <div class="detail-value">${doctor.education}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t.experience}:</div>
            <div class="detail-value">${doctor.experience}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">${t.languages}:</div>
            <div class="detail-value">${languagesText}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="contact-section">
      <h3>${t.contact}</h3>
      <div class="doctor-profile-details">
        <div class="detail-item">
          <div class="detail-label">${t.address}:</div>
          <div class="detail-value">${doctor.address}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">${t.phone}:</div>
          <div class="detail-value">${doctor.phone}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">${t.email}:</div>
          <div class="detail-value">${doctor.email}</div>
        </div>
      </div>
    </div>
    
    <h3 class="schedule-title">${t.schedule}</h3>
    <div class="weekly-schedule">
      ${scheduleHTML}
    </div>
    
    <div class="reviews-section">
      <h3>${t.reviews} (${doctor.reviews.length})</h3>
      <div class="review-list">
        ${reviewsHTML}
      </div>
      <button class="write-review-btn" data-id="${doctor.id}">${t.writeReview}</button>
    </div>
  `;
  
  // Add event listener to review button
  detailsContainer.querySelector('.write-review-btn').addEventListener('click', () => {
    closeModal(modal);
    showReviewForm(doctor.id);
  });
  
  // Show modal
  openModal(modal);
}

// Show review form in modal
function showReviewForm(doctorId) {
  const modal = document.getElementById('review-modal');
  const form = document.getElementById('review-form');
  const doctorIdInput = document.getElementById('doctor-id');
  const ratingStars = document.querySelectorAll('.rating-input i');
  const ratingValue = document.getElementById('rating-value');
  const t = translations[currentLang];
  
  // Update form language
  document.querySelector('#review-form label[for="reviewer-name"]').textContent = t.yourName;
  document.querySelector('#review-form .form-group:nth-child(2) label').textContent = t.yourRating;
  document.querySelector('#review-form label[for="review-text"]').textContent = t.yourReview;
  document.querySelector('#review-form button[type="submit"]').textContent = t.submit;
  document.querySelector('#review-modal h2').textContent = t.writeReview;
  
  // Set doctor ID
  doctorIdInput.value = doctorId;
  
  // Reset form
  form.reset();
  ratingStars.forEach(star => {
    star.className = 'far fa-star';
  });
  ratingValue.value = '';
  
  // Set up rating stars
  ratingStars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating);
      ratingValue.value = rating;
      
      // Update star display
      ratingStars.forEach((s, index) => {
        if (index < rating) {
          s.className = 'fas fa-star active';
        } else {
          s.className = 'far fa-star';
        }
      });
    });
    
    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.dataset.rating);
      
      // Update star display on hover
      ratingStars.forEach((s, index) => {
        if (index < rating) {
          s.className = 'fas fa-star';
        } else {
          s.className = 'far fa-star';
        }
      });
    });
    
    star.addEventListener('mouseout', () => {
      const rating = parseInt(ratingValue.value) || 0;
      
      // Reset star display when mouse leaves
      ratingStars.forEach((s, index) => {
        if (index < rating) {
          s.className = 'fas fa-star active';
        } else {
          s.className = 'far fa-star';
        }
      });
    });
  });
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const reviewerName = document.getElementById('reviewer-name').value;
    const rating = parseInt(ratingValue.value);
    const reviewText = document.getElementById('review-text').value;
    
    if (!rating) {
      alert('Please select a rating');
      return;
    }
    
    // Find the doctor
    const doctor = doctorsData.find(d => d.id === parseInt(doctorIdInput.value));
    
    if (doctor) {
      // Create new review
      const newReview = {
        id: Date.now(),
        name: reviewerName,
        date: new Date().toISOString().split('T')[0],
        rating,
        text: reviewText
      };
      
      // Add review to doctor
      doctor.reviews.unshift(newReview);
      
      // Update doctor rating
      const totalRating = doctor.reviews.reduce((sum, review) => sum + review.rating, 0);
      doctor.rating = (totalRating / doctor.reviews.length).toFixed(1);
      doctor.reviewCount++;
      
      // Close modal and refresh doctors
      closeModal(modal);
      renderDoctors();
      
      // Show success message
      alert('Thank you for your review!');
    }
  });
  
  // Show modal
  openModal(modal);
}

// Open modal
function openModal(modal) {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}