document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const successView = document.getElementById('success-view');
    
    const goToRegisterBtn = document.getElementById('go-to-register');
    const goToLoginBtn = document.getElementById('go-to-login');
    const returnToLoginBtn = document.getElementById('return-to-login');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    
    const loginLoader = document.getElementById('login-loader');
    const registerLoader = document.getElementById('register-loader');
    
    // View Switching logic
    function switchView(hideEl, showEl, direction = 'right') {
        // Add directions for enter/exit animations
        if (direction === 'right') {
            hideEl.classList.add('slide-left');
            showEl.classList.remove('slide-left');
        } else {
            hideEl.classList.remove('slide-left');
            showEl.classList.add('slide-left');
        }
        
        hideEl.classList.remove('active-view');
        hideEl.classList.add('hidden-view');
        
        // Slight delay to allow CSS reflow
        setTimeout(() => {
            showEl.classList.remove('hidden-view');
            showEl.classList.add('active-view');
        }, 50);
    }

    goToRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(loginView, registerView, 'right');
    });

    goToLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(registerView, loginView, 'left');
    });

    returnToLoginBtn.addEventListener('click', () => {
        switchView(successView, loginView, 'left');
    });

    // Toast Notification System
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;
        
        toastContainer.appendChild(toast);
        
        // Trigger reflow
        void toast.offsetWidth;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Button Loading State
    function setLoading(btnInfo, isLoading) {
        const btn = btnInfo.btn;
        const loader = btnInfo.loader;
        const text = btn.querySelector('.btn-text');
        
        if (isLoading) {
            btn.disabled = true;
            text.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            btn.disabled = false;
            text.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    // --- API Interactions ---

    // Register Submit
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const password = document.getElementById('register-password').value;
        const confirmPass = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPass) {
            showToast('Passwords do not match', 'error');
            return;
        }
        
        const payload = {
            userPassword: password
        };

        setLoading({btn: registerBtn, loader: registerLoader}, true);
        
        try {
            const response = await fetch('/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                const data = await response.json();
                
                // Show success view and display generated user ID
                document.getElementById('generated-user-id').innerText = data.userId;
                switchView(registerView, successView, 'right');
                registerForm.reset();
                showToast('Registration successful!', 'success');
            } else {
                showToast('Registration failed. Try again.', 'error');
            }
        } catch (error) {
            showToast('Network error occurred.', 'error');
            console.error('Error:', error);
        } finally {
            setLoading({btn: registerBtn, loader: registerLoader}, false);
        }
    });

    // Login Submit
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('login-userId').value;
        const password = document.getElementById('login-password').value;
        
        const payload = {
            userId: parseInt(userId, 10),
            password: password
        };
        
        setLoading({btn: loginBtn, loader: loginLoader}, true);
        
        try {
            const response = await fetch('/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                const isSuccess = await response.json(); // backend returns Boolean
                
                if (isSuccess === true) {
                    showToast('Login successful!', 'success');
                    // Usually you would redirect here, e.g., window.location.href = '/dashboard.html';
                } else {
                    showToast('Invalid credentials.', 'error');
                }
            } else {
                showToast('Login error. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Network error occurred.', 'error');
            console.error('Error:', error);
        } finally {
            setLoading({btn: loginBtn, loader: loginLoader}, false);
        }
    });
});
