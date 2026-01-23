// Animations and effects for the login form
document.addEventListener('DOMContentLoaded', function() {
    
    // Animation for inputs when they receive focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Handle the login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Button animation
            const btn = loginForm.querySelector('button');
            btn.textContent = 'Signing in...';
            btn.style.background = 'linear-gradient(135deg, #52c234 0%, #4caf50 100%)';
            
            // Redirect to welcome.html after a small delay for the effect
            setTimeout(() => {
                window.location.href = 'welcome.html';
            }, 1000);
        });
    }

    // Handle the registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            const btn = registerForm.querySelector('button');
            
            // Simple visual validation (no real functionality)
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }
            
            // Button animation
            btn.textContent = 'Registering...';
            btn.style.background = 'linear-gradient(135deg, #52c234 0%, #4caf50 100%)';
            
            // Redirect to welcome.html after a small delay
            setTimeout(() => {
                window.location.href = 'welcome.html';
            }, 1000);
        });
        
        // Real-time password validation
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        
        confirmPasswordInput.addEventListener('input', function() {
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.style.borderColor = '#ff4444';
            } else {
                confirmPasswordInput.style.borderColor = '#4caf50';
            }
        });
    }

    // Background particle effects (optional)
    createFloatingShapes();
});

// Function to create decorative floating shapes
function createFloatingShapes() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.style.position = 'fixed';
        shape.style.width = Math.random() * 100 + 50 + 'px';
        shape.style.height = shape.style.width;
        shape.style.borderRadius = '50%';
        shape.style.background = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
        shape.style.left = Math.random() * window.innerWidth + 'px';
        shape.style.top = Math.random() * window.innerHeight + 'px';
        shape.style.pointerEvents = 'none';
        shape.style.zIndex = '-1';
        shape.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        
        document.body.appendChild(shape);
    }
    
    // Add keyframes for the floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(20px);
            }
            50% {
                transform: translateY(-40px) translateX(-20px);
            }
            75% {
                transform: translateY(-20px) translateX(-40px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Typewriter effect for messages (if we want to use it)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}