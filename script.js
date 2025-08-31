// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formStatus = document.getElementById('form-status');
    
    // Get form data
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;
    
    // Create mailto link
    const mailtoLink = `mailto:shivamkumar797977@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    formStatus.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i> Your email client has been opened. Please send the email to complete your message.</div>';
    
    // Reset form after a delay
    setTimeout(() => {
        form.reset();
        formStatus.innerHTML = '';
    }, 5000);
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .achievement-item, .cert-item, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Certificate modal functionality
const certItems = document.querySelectorAll('.cert-item');
const certModal = document.getElementById('cert-modal');
const certImage = document.getElementById('cert-image');
const certTitle = document.getElementById('cert-title');
const certDescription = document.getElementById('cert-description');
const certClose = document.querySelector('.cert-close');
const viewAllCertsBtn = document.getElementById('view-all-certs');

// Certificate data - UPDATE IMAGE PATHS HERE
const certificates = {
    pl300: {
        image: 'powerbi.jpg',  // ← Your Power BI certificate (rename file to powerbi.jpg)
        title: 'PL-300 Power BI Data Analyst',
        description: 'Microsoft Certified: Power BI Data Analyst Associate - Demonstrates skills in data preparation, modeling, visualization, analysis, and deployment of scalable data models with Microsoft Power BI.'
    },
    dp900: {
        image: 'azure-data.jpg',  // ← Your Azure Data certificate (rename file to azure-data.jpg)
        title: 'DP-900 Azure Data Fundamentals',
        description: 'Microsoft Certified: Azure Data Fundamentals - Validates foundational knowledge of core data concepts and how they are implemented using Microsoft Azure data services.'
    },
    ai900: {
        image: 'azure-ai.jpg',  // ← Your Azure AI certificate (rename file to azure-ai.jpg)
        title: 'AI-900 Azure AI Fundamentals',
        description: 'Microsoft Certified: Azure AI Fundamentals - Demonstrates knowledge of machine learning and artificial intelligence concepts and related Microsoft Azure services.'
    },
    az900: {
        image: 'azure-fundamentals.jpg',  // ← Your Azure Fundamentals certificate (rename file)
        title: 'AZ-900 Azure Fundamentals',
        description: 'Microsoft Certified: Azure Fundamentals - Validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure.'
    },
    gcp: {
        image: 'google-cloud.jpg',  // ← Your Google Cloud certificate (add as google-cloud.jpg)
        title: 'Google Cloud Digital Leader',
        description: 'Google Cloud Certified: Cloud Digital Leader - Demonstrates ability to articulate the capabilities of Google Cloud core products and services and how they benefit organizations.'
    }
};

// Add click event to certificate items
certItems.forEach(item => {
    item.addEventListener('click', () => {
        const certType = item.getAttribute('data-cert');
        const cert = certificates[certType];
        
        if (cert) {
            console.log('Loading certificate image:', cert.image);
            certImage.src = cert.image;
            certImage.onload = function() {
                console.log('Certificate image loaded successfully:', cert.image);
            };
            certImage.onerror = function() {
                console.error('Failed to load certificate image:', cert.image);
                this.src = 'https://via.placeholder.com/800x600/95a5a6/ffffff?text=Certificate+Image+Not+Found';
            };
            certTitle.textContent = cert.title;
            certDescription.textContent = cert.description;
            certModal.style.display = 'block';
        }
    });
});

// View all certificates button
viewAllCertsBtn.addEventListener('click', () => {
    // Show first certificate by default
    const firstCert = certificates.pl300;
    console.log('Loading first certificate:', firstCert.image);
    certImage.src = firstCert.image;
    certImage.onload = function() {
        console.log('First certificate loaded successfully');
    };
    certImage.onerror = function() {
        console.error('Failed to load first certificate:', firstCert.image);
        this.src = 'https://via.placeholder.com/800x600/95a5a6/ffffff?text=Certificate+Image+Not+Found';
    };
    certTitle.textContent = firstCert.title;
    certDescription.textContent = firstCert.description;
    certModal.style.display = 'block';
});

// Close modal
certClose.addEventListener('click', () => {
    certModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === certModal) {
        certModal.style.display = 'none';
    }
});

// Add CSS for loading animation and form status
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 2rem;
        font-weight: 600;
        z-index: 10000;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .nav-link.active {
        color: #3498db;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .form-status {
        margin-top: 1rem;
        text-align: center;
    }
    
    .success-message {
        background: rgba(46, 204, 113, 0.1);
        color: #27ae60;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid rgba(46, 204, 113, 0.3);
        backdrop-filter: blur(10px);
    }
    
    .error-message {
        background: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid rgba(231, 76, 60, 0.3);
        backdrop-filter: blur(10px);
    }
    
    .success-message i, .error-message i {
        margin-right: 0.5rem;
    }
    
    .contact-options {
        margin-bottom: 2rem;
        text-align: center;
    }
    
    .contact-options h4 {
        color: #bdc3c7;
        margin-bottom: 1rem;
    }
    
    .quick-contact {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .quick-btn {
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .email-btn {
        background: #3498db;
        color: white;
    }
    
    .phone-btn {
        background: #2ecc71;
        color: white;
    }
    
    .whatsapp-btn {
        background: #25d366;
        color: white;
    }
    
    .quick-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    @media (max-width: 768px) {
        .cert-modal-content {
            width: 95%;
            margin: 5% auto;
            padding: 1.5rem;
        }
        
        .cert-item {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
        }
        
        .view-cert {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
    }
`;
document.head.appendChild(style);