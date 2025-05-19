// DOM Elements
const body = document.querySelector('body');
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('nav');
const cursorFollower = document.querySelector('.cursor-follower');
const backToTop = document.querySelector('.back-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.querySelector('.modal-body');

// Typing effect text options
const typingTextOptions = [
    'Web Developer',
    'Frontend Engineer',
    'UI/UX Enthusiast',
    'JavaScript Expert',
    'Problem Solver'
];

// Initialize typing effect
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
const typingElement = document.querySelector('.typing');

// Function to handle typing effect
function typeText() {
    const currentText = typingTextOptions[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTextOptions.length;
        typingDelay = 500; // Pause before typing next
    }
    
    setTimeout(typeText, typingDelay);
}

// Start typing effect
window.addEventListener('load', typeText);

// Theme toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Cursor follower effect
document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursorFollower.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursorFollower.classList.remove('active');
});

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project modal
function openProjectModal(projectId) {
    // Here you would fetch project details based on ID
    // For now, we'll use placeholder content
    const projectDetails = {
        title: 'Project Title',
        image: 'https://via.placeholder.com/900x500',
        description: 'Detailed project description goes here. This is where you would explain the project in depth, including technologies used, challenges faced, and solutions implemented.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
        liveLink: '#',
        githubLink: '#'
    };
    
    // Populate modal with project details
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${projectDetails.image}" alt="${projectDetails.title}">
        </div>
        <h3>${projectDetails.title}</h3>
        <div class="modal-description">
            <p>${projectDetails.description}</p>
        </div>
        <div class="technologies-used">
            <h4>Technologies Used:</h4>
            <div class="tech-tags">
                ${projectDetails.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        <div class="modal-links">
            <a href="${projectDetails.liveLink}" class="btn primary-btn" target="_blank">View Live</a>
            <a href="${projectDetails.githubLink}" class="btn secondary-btn" target="_blank">View Code</a>
        </div>
    `;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Project data management system
const projectsData = [
    {
        id: 1,
        title: 'E-Commerce Website',
        thumbnail: 'https://via.placeholder.com/600x400',
        category: 'web',
        description: 'A fully responsive e-commerce platform with product filtering, cart functionality, and payment integration.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        liveLink: '#',
        githubLink: '#',
        featured: true
    },
    {
        id: 2,
        title: 'Weather App',
        thumbnail: 'https://via.placeholder.com/600x400',
        category: 'app',
        description: 'A weather application that fetches real-time data from a weather API and displays forecast information.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
        liveLink: '#',
        githubLink: '#',
        featured: false
    },
    {
        id: 3,
        title: 'Portfolio Website',
        thumbnail: 'https://via.placeholder.com/600x400',
        category: 'web',
        description: 'A personal portfolio website showcasing my projects and skills.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveLink: '#',
        githubLink: '#',
        featured: true
    }
];

// Function to dynamically generate project cards
function generateProjectCards() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.thumbnail}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-info">
                        <h4>${project.title}</h4>
                        <div class="project-category">${project.category}</div>
                        <button class="view-project-btn" onclick="openProjectModal(${project.id})">View Details</button>
                    </div>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
    
    // Re-select project cards after they've been generated
    const projectCards = document.querySelectorAll('.project-card');
    return projectCards;
}

// Function to add a new project
function addProject(projectData) {
    // Generate a new ID (typically would be handled by a backend)
    const newId = projectsData.length > 0 ? Math.max(...projectsData.map(p => p.id)) + 1 : 1;
    
    // Create new project object
    const newProject = {
        id: newId,
        ...projectData
    };
    
    // Add to projects array
    projectsData.push(newProject);
    
    // Regenerate project cards
    generateProjectCards();
    
    // Return the new project ID
    return newId;
}

// Function to edit an existing project
function editProject(id, updatedData) {
    const projectIndex = projectsData.findIndex(p => p.id === id);
    
    if (projectIndex !== -1) {
        // Update project data
        projectsData[projectIndex] = {
            ...projectsData[projectIndex],
            ...updatedData
        };
        
        // Regenerate project cards
        generateProjectCards();
        
        return true;
    }
    
    return false;
}

// Function to delete a project
function deleteProject(id) {
    const initialLength = projectsData.length;
    projectsData = projectsData.filter(p => p.id !== id);
    
    // If a project was removed, regenerate the cards
    if (projectsData.length < initialLength) {
        generateProjectCards();
        return true;
    }
    
    return false;
}

// Initialize project cards on page load
window.addEventListener('load', () => {
    generateProjectCards();
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Show success message
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        // Show error message
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Skill hover effect
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hovered');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hovered');
    });
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Back to top button functionality
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// Fetch projects from API
async function fetchProjects() {
  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    
    // Clear existing projects
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    // Generate project cards
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.setAttribute('data-category', project.category);
      
      projectCard.innerHTML = `
        <div class="project-img">
          <img src="${project.imageUrl}" alt="${project.title}">
          <div class="project-overlay">
            <div class="project-info">
              <h4>${project.title}</h4>
              <div class="project-category">${project.category}</div>
              <button class="view-project-btn" data-id="${project._id}">View Details</button>
            </div>
          </div>
        </div>
      `;
      
      projectsGrid.appendChild(projectCard);
      
      // Add event listener to view project button
      const viewBtn = projectCard.querySelector('.view-project-btn');
      viewBtn.addEventListener('click', () => openProjectModal(project._id));
    });
    
    // Re-initialize project filters
    initProjectFilters();
    
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
}

// Fetch project details and open modal
async function openProjectModal(projectId) {
  try {
    const response = await fetch(`/api/projects/${projectId}`);
    const project = await response.json();
    
    // Populate modal with project details
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = `
      <div class="modal-image">
        <img src="${project.imageUrl}" alt="${project.title}">
      </div>
      <h3>${project.title}</h3>
      <div class="modal-description">
        <p>${project.description}</p>
      </div>
      <div class="technologies-used">
        <h4>Technologies Used:</h4>
        <div class="tech-tags">
          ${project.tags.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
      <div class="modal-links">
        <a href="${project.projectUrl}" class="btn primary-btn" target="_blank">View Live</a>
        <a href="${project.githubUrl}" class="btn secondary-btn" target="_blank">View Code</a>
      </div>
    `;
    
    // Show modal
    const modal = document.getElementById('projectModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  } catch (error) {
    console.error('Error fetching project details:', error);
  }
}

// Call fetchProjects on page load
document.addEventListener('DOMContentLoaded', fetchProjects);