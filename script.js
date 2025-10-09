// ==============================================
// SIDEBAR LOGIC
// ==============================================
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
// ==============================================
// DARKMODE LOGIC
// ==============================================
// In script.js (Main folder)

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

// Function to send the current theme state to the iframe
function postIframeTheme(themeState) {
    const iframe = document.getElementById('course-iframe');
    // Check if the iframe element exists and its content is accessible
    if (iframe && iframe.contentWindow) {
        // Post message to the iframe. Origin check is secure.
        iframe.contentWindow.postMessage(themeState, window.location.origin);
    }
}

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    // Send 'dark' message to the iframe
    postIframeTheme('dark');
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'null');
    // Send 'light' message to the iframe
    postIframeTheme('light');
}

// Initial theme load on parent page
if (darkmode === "active") {
    enableDarkMode();
} 

// Event listener for theme toggle button
themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkMode() : disableDarkMode()
});


// ⭐ GLOBAL FUNCTION CALLED BY IFRAME ONLOAD (via courses.js)
window.syncIframeThemeOnLoad = function() {
    const themeState = document.body.classList.contains('darkmode') ? 'dark' : 'light';
    postIframeTheme(themeState);
}
// ==============================================
// BACKGROUND CANVAS LOGIC
// ==============================================

// Get the canvas element and its 2D drawing context
const canvas = document.getElementById('floatingCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 50; 
const MAX_LINE_DISTANCE = 100; 

// --- Theme-Aware Color Function ---
function getParticleColor() {
    // Read the current computed style from the 'body' element
    const computedStyle = getComputedStyle(document.body);
    
    // Use --text-color for the particles/lines to ensure contrast with the background
    const textColor = computedStyle.getPropertyValue('--secondary-text-color').trim() || '#000000';
    
    // We'll return the base color (e.g., '#000000' or '#ffffff') to be used 
    // for the particles and then modify its opacity when drawing.
    return textColor;
}

// Adjust canvas size to match the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class Definition remains the same, only the color property is now set dynamically
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 1 + .5;
        // Particle color is set later in the draw/animate loop
        
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    // Draws the particle
    draw(color) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Use the theme-aware color with an adjusted opacity for the fill
        ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', ', 0.5)'); 
        ctx.fill();
    }

    // Updates position and handles screen boundaries
    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) {
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy *= -1;
        }
    }
}

// Initialization: Create particles at random positions
function init() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
}

// Function to draw lines between close particles
function connectParticles(color) {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            const p1 = particles[a];
            const p2 = particles[b];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If they are close enough, draw a line
            if (distance < MAX_LINE_DISTANCE) {
                // Line opacity fades with distance
                const constantOpacity = 0.3;
                
                // Use the theme-aware color with calculated opacity for the stroke
                ctx.strokeStyle = color.replace('rgb', 'rgba').replace(')', `, 1)`);
                ctx.lineWidth = 0.3;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

// The main animation loop
function animate() {
    // 1. Get the current theme color before drawing
    const currentColor = getParticleColor();
    
    // Clear the canvas on each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Draw lines using the current color
    connectParticles(currentColor);

    // 3. Update and draw all particles using the current color
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(currentColor);
    }

    requestAnimationFrame(animate);
}

// Start the animation
init();
animate();
// ==============================================
// THEME SYNC FOR IFRAMES
// ==============================================

// Function to send the theme state to all iframes
function updateIframeTheme(theme) {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        // Check if the iframe content is loaded and available
        if (iframe.contentWindow) {
            // Send the theme ('dark' or 'light') to the iframe's content window
            iframe.contentWindow.postMessage(theme, window.location.origin);
        }
    });
}

// You must also call updateIframeTheme when content is initially loaded (important for dynamic content)

//====================================
// CARAOUSEL DOTS
//====================================
    function setupCarousel(carouselSelector, dotsSelector) {
        const carousel = document.querySelector(carouselSelector);
        const dots = document.querySelectorAll(dotsSelector);
        
        if (!carousel || dots.length === 0) return; // Exit if elements don't exist
        
        carousel.addEventListener('scroll', () => {
            const scrollPosition = carousel.scrollLeft;
            const cardWidth = carousel.offsetWidth;
            const activeIndex = Math.round(scrollPosition / cardWidth);

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // Initialize both carousels
    setupCarousel('.course-cards', '.carousel-dots .dot');
    setupCarousel('.feature-cards', '.carousel-dots-features .dot');