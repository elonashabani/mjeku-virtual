// Ratings related functionality

// Generate full star rating HTML for a given rating value
function getStarRatingHTML(rating) {
  // Round to nearest half star
  rating = Math.round(rating * 2) / 2;
  
  let html = '';
  
  // Add full stars
  for (let i = 1; i <= Math.floor(rating); i++) {
    html += '<i class="fas fa-star"></i>';
  }
  
  // Add half star if needed
  if (rating % 1 !== 0) {
    html += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Add empty stars
  for (let i = Math.ceil(rating); i < 5; i++) {
    html += '<i class="far fa-star"></i>';
  }
  
  return html;
}

// Calculate average rating from an array of reviews
function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) {
    return 0;
  }
  
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1);
}

// Sort doctors by rating (highest first)
function sortDoctorsByRating(doctors) {
  return [...doctors].sort((a, b) => b.rating - a.rating);
}

// Filter doctors by minimum rating
function filterDoctorsByMinRating(doctors, minRating) {
  return doctors.filter(doctor => doctor.rating >= minRating);
}

// Filter doctors by specialty
function filterDoctorsBySpecialty(doctors, specialty) {
  if (!specialty) return doctors;
  return doctors.filter(doctor => 
    doctor.specialty.toLowerCase() === specialty.toLowerCase()
  );
}

// Get top rated doctors (limited number)
function getTopRatedDoctors(doctors, limit = 6) {
  return sortDoctorsByRating(doctors).slice(0, limit);
}

// Search doctors by name or specialty
function searchDoctors(doctors, searchTerm) {
  if (!searchTerm) return doctors;
  
  searchTerm = searchTerm.toLowerCase();
  
  return doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm) ||
    doctor.specialty.toLowerCase().includes(searchTerm)
  );
}

// Add a new review to a doctor
function addReview(doctorId, reviewData) {
  const doctor = doctorsData.find(d => d.id === doctorId);
  
  if (!doctor) {
    console.error('Doctor not found');
    return false;
  }
  
  // Create new review
  const newReview = {
    id: Date.now(),
    name: reviewData.name,
    date: new Date().toISOString().split('T')[0],
    rating: reviewData.rating,
    text: reviewData.text
  };
  
  // Add to doctor's reviews
  doctor.reviews.unshift(newReview);
  
  // Update doctor's average rating
  const newAvgRating = calculateAverageRating(doctor.reviews);
  doctor.rating = parseFloat(newAvgRating);
  doctor.reviewCount = doctor.reviews.length;
  
  return true;
}