// Function to implement smooth scrolling with easing
function smoothScrollTo(target) {
  const start = window.pageYOffset; // Starting position
  const targetPosition = target.offsetTop; // Target position
  const distance = targetPosition - start; // Total scroll distance
  const duration = 800; // Duration in milliseconds (you can adjust this for faster/slower scroll)
  
  let startTime = null;
  
  // Easing function (ease-in-out)
  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // Scroll animation function
  function animateScroll(timestamp) {
    if (!startTime) startTime = timestamp;
    const timeElapsed = timestamp - startTime;
    const run = ease(timeElapsed / duration) * distance;
    window.scrollTo(0, start + run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll); // Keep animating until the duration is reached
    } else {
      window.scrollTo(0, targetPosition); // Ensure the final position is exactly the target
    }
  }

  requestAnimationFrame(animateScroll); // Start the animation
}

// Add event listener to all anchor links for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      smoothScrollTo(target);
    }
  });
});
