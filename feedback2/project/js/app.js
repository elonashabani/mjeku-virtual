// Main application script

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the UI
  initUI();
  
  // Render initial doctors list
  renderDoctors();
  
  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        document.querySelector('.main-nav').classList.remove('active');
        
        // Scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add animations on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.specialty-card, .doctor-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.9) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initial check for elements in view
  animateOnScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchButton = document.querySelector('.search-btn');
  
  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    filterDoctors();
    
    // Scroll to doctors section
    document.getElementById('doctors').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });
});