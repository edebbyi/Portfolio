/*DARK MODE*/
var darkModeSwitch = document.querySelector("#toggleButton");

darkModeSwitch.addEventListener("click", function () {
  document.querySelector("body").classList.toggle("dark-mode");
});

/*GREETINGS*/

/*const greetings = [
  "Hello", // English
  "Bonjour", // French
  "Kamusta", //Filipino
  "Hola", // Spanish
  "Aloha", //Hawaiian
  "Ciao", // Italian
  "你好", // Chinese (Simplified)
  "Olá", // Porteguese
  "Salve", // Latin
  "こんにちは", // Japanese
  "Hallo", //German
  "Hej", //Danish
  "नमस्ते", //Hindi
  "Habari", //Swahili
  "안녕하세요" // Korean
];

let currentIndex = 0;
const greetingElement = document.getElementById("greeting");
let intervalId;

function fadeIn(element) {
  element.style.transition = "opacity 1s ease-in-out";
  element.style.opacity = "1";
}

function fadeOut(element) {
  element.style.transition = "opacity 1s ease-in-out";
  element.style.opacity = "0";
}

// Initially set the greeting to "Hello" without fade
greetingElement.textContent = greetings[currentIndex];
fadeIn(greetingElement);

// Function to start the interval
function startInterval() {
  intervalId = setInterval(function () {
    fadeOut(greetingElement);
    setTimeout(function () {
      currentIndex = (currentIndex + 1) % greetings.length;
      greetingElement.textContent = greetings[currentIndex];
      fadeIn(greetingElement);
    }, 1000); // Wait for fadeOut to complete before changing greeting
  }, 5000); // Adjust the interval as needed
}

// Start fading out the greeting and displaying new ones periodically
startInterval();

// Reset the greetings array when entering the #intro section
document.getElementById("intro").addEventListener("mouseenter", function () {
  clearInterval(intervalId); // Clear the existing interval
  currentIndex = 0; // Reset currentIndex to 0
  greetingElement.textContent = "Hello"; // Set greeting to "Hello" immediately
  startInterval(); // Restart the interval
});
*/

/*SCROLL*/
document.addEventListener("DOMContentLoaded", function () {
  const specificSection = document.getElementById("intro");
  const upArrow = document.getElementById("up-arrow");
  const footer = document.getElementById("foot");

  // Check if all elements are available
  if (!specificSection || !upArrow || !footer) {
    console.error("One or more elements not found.");
    return;
  }

  // Calculate the halfway point of the specific section
  const halfwayPoint =
    specificSection.offsetTop + specificSection.offsetHeight / 2;

  // Listen for scroll events
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    // Check if the scroll position is beyond the halfway point of the specific section
    if (scrollPosition > halfwayPoint) {
      upArrow.style.display = "block"; // Display the fixed item
    } else {
      upArrow.style.display = "none"; // Hide the fixed item
    }

    // Calculate the distance from the top of the document to the top of the footer
    const footerDistance = footer.offsetTop - scrollPosition;

    // Check if the scroll position is near the footer
    if (footerDistance <= window.innerHeight) {
      const bottomPosition = footerDistance - window.innerHeight + 140; // Adjust position to just above footer
      upArrow.style.position = "fixed"; // Set position to fixed
      upArrow.style.bottom =
        bottomPosition > 140 ? `${bottomPosition}px` : "140px"; // Ensure the fixed item is not below the window
    } else {
      upArrow.style.position = "fixed"; // Reset position to fixed
      upArrow.style.bottom = "20px"; // Reset bottom position
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const upArrow = document.getElementById("up-arrow");

  // Check if the fixed item is available
  if (!upArrow) {
    console.error("Fixed item not found.");
    return;
  }

  // Smooth scroll to the top when clicking on the fixed item
  upArrow.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scroll behavior
    });
  });
});

/*REVEAL*/

// Select all elements with the class 'reveal'
const reveals = document.querySelectorAll(".reveal");

// Create a function to handle the intersection of elements
const revealOnScroll = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add the class 'active' when the element is in view
      entry.target.classList.add("active");
      // Once the element is revealed, stop observing it
      observer.unobserve(entry.target);
    }
  });
};

// Create an IntersectionObserver with the callback function
const observer = new IntersectionObserver(revealOnScroll, {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0.1 // Element must be 10% in view to trigger
});

// Observe each element with the class 'reveal'
reveals.forEach((reveal) => {
  observer.observe(reveal);
});
