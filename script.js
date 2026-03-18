// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');
if (skillBars.length > 0) {
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                bar.style.width = bar.style.width;
            }
        });
    };
    
    window.addEventListener('scroll', animateSkills);
    animateSkills();
}

// Add active class to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// Scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    z-index: 99;
`;

document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Certification cards hover effect
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Track LinkedIn profile clicks
const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
linkedinLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('LinkedIn profile clicked');
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    
    // Update copyright year
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
});

// Chatbot Logic
const chatInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chatBox');

// More detailed and ordered Q&A pairs for better matching. The first match found is used.
const qaPairs = [
    {
        keywords: ["graduate", "graduated", "graduation"],
        response: "He graduated at the end of 2025 with a National Diploma in ICT from the University of Mpumalanga."
    },
    {
        keywords: ["education", "study", "diploma", "college", "university"],
        response: "Prince holds a National Diploma in ICT from the University of Mpumalanga (2023-2025)."
    },
    {
        keywords: ["hello", "hi", "hey"],
        response: "Hi there! How can I help you learn more about Prince?"
    },
    {
        keywords: ["who are you", "about you"],
        response: "I am a simple AI assistant for Prince's portfolio. You can ask me about his skills, projects, and background."
    },
    {
        keywords: ["who", "about", "tell me about"],
        response: "Method Prince Mbowana is an ICT Graduate and a Web & Software Developer Intern at KayiseIT. He's passionate about using technology to solve real-world problems."
    },
    {
        keywords: ["skill", "skills", "technologies"],
        response: "Prince is skilled in Frontend (HTML, CSS, JavaScript, React, React Native) and Backend (PHP, Python, Node.js) development, plus databases like MySQL and MongoDB. For more, see the 'Contact' page."
    },
    {
        keywords: ["project", "projects", "work"],
        response: "He has worked on an edu-learning platform, a Smart Agriculture Monitoring System, and a campus map app. Check out the 'Projects' page for more details!"
    },
    {
        keywords: ["contact", "email", "phone", "get in touch"],
        response: "You can contact Prince via email at princembowana013@gmail.com or by phone at 072 617 3997."
    },
    {
        keywords: ["experience", "intern", "kayiseit"],
        response: "He is currently a Web & Software Developer Intern at KayiseIT."
    }
];

const defaultResponse = "I'm not sure about that. Try asking about his skills, projects, education, or how to contact him.";

function getBotResponse(userInput) {
    const text = userInput.trim().toLowerCase();
    if (text === "") return null;

    // Find the best matching response
    for (const pair of qaPairs) {
        for (const keyword of pair.keywords) {
            if (text.includes(keyword)) {
                return pair.response;
            }
        }
    }
    
    return defaultResponse;
}

function sendMessage() {
    if (!chatInput || !chatBox) return;
    
    const userText = chatInput.value;
    if (userText.trim() === "") return;
    
    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = userText;
    chatBox.appendChild(userDiv);
    
    chatInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Get and display bot response
    const botResponse = getBotResponse(userText);
    
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.textContent = botResponse;
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

// Event Listeners for Chat
if (sendBtn) sendBtn.addEventListener('click', sendMessage);
if (chatInput) chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });