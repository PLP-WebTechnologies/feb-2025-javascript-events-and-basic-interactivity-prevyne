// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript Playground Loaded! Let's get interactive! 🚀");

    // --- 1. Event Handling 🎈 ---

    // Button click
    const clickMeBtn = document.getElementById('clickMeBtn');
    clickMeBtn.addEventListener('click', () => {
        alert('Button Clicked! You rock! 🎉');
        console.log('Click Me button was pressed.');
    });

    // Hover effects
    const hoverDiv = document.getElementById('hoverDiv');
    hoverDiv.addEventListener('mouseover', () => {
        hoverDiv.textContent = 'Woo! Hovering!';
        console.log('Mouse over hoverDiv.');
    });
    hoverDiv.addEventListener('mouseout', () => {
        hoverDiv.textContent = 'Hover Over Me!';
        console.log('Mouse out of hoverDiv.');
    });

    // Keypress detection
    const keyPressInput = document.getElementById('keyPressInput');
    const keyPressOutput = document.getElementById('keyPressOutput');
    keyPressInput.addEventListener('keypress', (event) => {
        // We can use 'key', 'keyCode' (deprecated but still works), or 'code'
        keyPressOutput.textContent = `Key pressed: ${event.key} (Code: ${event.code})`;
        console.log(`Key pressed: ${event.key}, Code: ${event.code}, keyCode: ${event.keyCode}`);
    });

    // Bonus: Secret action (double-click and long press)
    const secretActionDiv = document.getElementById('secretActionDiv');
    const secretMessage = document.getElementById('secretMessage');
    let pressTimer; // For long press

    secretActionDiv.addEventListener('dblclick', () => {
        secretMessage.classList.remove('hidden');
        secretActionDiv.textContent = "Double Click Secret Revealed!";
        console.log('Secret revealed via double click!');
        setTimeout(() => { // Hide message after some time
            secretMessage.classList.add('hidden');
            secretActionDiv.textContent = "Double Click or Long Press Me for a Secret!";
        }, 3000);
    });

    secretActionDiv.addEventListener('mousedown', () => {
        // Start a timer for long press
        pressTimer = window.setTimeout(() => {
            secretMessage.classList.remove('hidden');
            secretMessage.textContent = "🤫 Wow, you found the LONG PRESS secret!"
            secretActionDiv.textContent = "Long Press Secret Revealed!";
            console.log('Secret revealed via long press!');
            setTimeout(() => { // Hide message after some time
                secretMessage.classList.add('hidden');
                secretMessage.textContent = "🤫 Wow, you found the secret!"; // Reset text
                secretActionDiv.textContent = "Double Click or Long Press Me for a Secret!";
            }, 4000);
        }, 1000); // 1000ms = 1 second for long press
    });

    secretActionDiv.addEventListener('mouseup', () => {
        // Clear the timer if the mouse is released before 1 second
        clearTimeout(pressTimer);
    });
    secretActionDiv.addEventListener('mouseleave', () => {
        // Also clear the timer if the mouse leaves the element
        clearTimeout(pressTimer);
    });


    // --- 2. Interactive Elements 🎮 ---

    // A button that changes text
    const changeTextBtn = document.getElementById('changeTextBtn');
    let textToggle = false;
    changeTextBtn.addEventListener('click', () => {
        textToggle = !textToggle;
        changeTextBtn.textContent = textToggle ? "Text Changed! Click Again." : "Change My Text";
        console.log('Text change button clicked. New text:', changeTextBtn.textContent);
    });

    // A button that changes color
    const changeColorBtn = document.getElementById('changeColorBtn');
    const colors = ['blue', 'red', 'green', 'yellow', 'default'];
    let currentColorIndex = 0;
    changeColorBtn.addEventListener('click', () => {
        // Remove previous color classes
        changeColorBtn.classList.remove(...colors); // Spread operator to remove all possible classes

        currentColorIndex = (currentColorIndex + 1) % colors.length;
        const newColorClass = colors[currentColorIndex];

        if (newColorClass !== 'default') {
            changeColorBtn.classList.add(newColorClass);
            changeColorBtn.textContent = `Color: ${newColorClass.charAt(0).toUpperCase() + newColorClass.slice(1)}`;
        } else {
            // Reset to original styles defined in CSS (or lack of specific color class)
            changeColorBtn.textContent = 'Change My Color';
        }
        console.log('Color change button clicked. New class:', newColorClass);
    });


    // Image gallery or slideshow
    const galleryImage = document.getElementById('galleryImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const images = [
        './images/lonewolf.jpg',
        './images/Zorin.jpg',
        './images/beauty.jpg',
    ];
    let currentImageIndex = 0;

    function updateGalleryImage() {
        galleryImage.src = images[currentImageIndex];
        galleryImage.alt = `Gallery Image ${currentImageIndex + 1}`;
        // Adding animation
        galleryImage.classList.add('galleryImage-animate');
        setTimeout(() => galleryImage.classList.remove('galleryImage-animate'), 500);
        console.log('Gallery image updated to index:', currentImageIndex);
    }

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
    });
    // Initialize first image
    updateGalleryImage();

    // Tabs or accordion-style content
    // Tabs
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab; // Get 'data-tab' attribute

            // Remove active class from all links and contents
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked link and corresponding content
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            console.log(`Tab changed to: ${tabId}`);
        });
    });

    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-header.active');
            if (currentlyActive && currentlyActive !== header) {
                currentlyActive.classList.remove('active');
                currentlyActive.nextElementSibling.style.maxHeight = null;
                currentlyActive.nextElementSibling.style.paddingTop = null; // For smoother animation
                currentlyActive.nextElementSibling.style.paddingBottom = null;
            }

            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Collapse
                content.style.paddingTop = null;
                content.style.paddingBottom = null;
                console.log('Accordion section collapsed:', header.textContent.trim());
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Expand
                content.style.paddingTop = "10px"; // Add padding when open
                content.style.paddingBottom = "10px";
                console.log('Accordion section expanded:', header.textContent.trim());
            }
        });
    });


    // --- 3. Form Validation ✅ ---
    const myForm = document.getElementById('myForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    // Real-time feedback functions
    function validateUsername() {
        if (usernameInput.value.trim() === '') {
            setError(usernameInput, usernameError, 'Username is required.');
            return false;
        } else {
            setSuccess(usernameInput, usernameError);
            return true;
        }
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        // Basic email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            setError(emailInput, emailError, 'Email is required.');
            return false;
        } else if (!emailRegex.test(emailValue)) {
            setError(emailInput, emailError, 'Please enter a valid email address.');
            return false;
        } else {
            setSuccess(emailInput, emailError);
            return true;
        }
    }

    function validatePassword() {
        const passwordValue = passwordInput.value;
        if (passwordValue === '') {
            setError(passwordInput, passwordError, 'Password is required.');
            return false;
        } else if (passwordValue.length < 8) {
            setError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
            return false;
        } else {
            setSuccess(passwordInput, passwordError);
            return true;
        }
    }

    function validateConfirmPassword() {
        const passwordValue = passwordInput.value;
        const confirmPasswordValue = confirmPasswordInput.value;
        if (confirmPasswordValue === '') {
            setError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
            return false;
        } else if (passwordValue !== confirmPasswordValue) {
            setError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
            return false;
        } else {
            setSuccess(confirmPasswordInput, confirmPasswordError);
            return true;
        }
    }

    // Helper functions for setting error/success states
    function setError(inputElement, errorElement, message) {
        inputElement.classList.add('invalid');
        inputElement.classList.remove('valid');
        errorElement.textContent = message;
        console.log(`Validation Error for ${inputElement.id}: ${message}`);
    }

    function setSuccess(inputElement, errorElement) {
        inputElement.classList.add('valid');
        inputElement.classList.remove('invalid');
        errorElement.textContent = ''; // Clear error message
    }

    // Add event listeners for real-time validation (on input or blur)
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    // Form submission
    myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission for this demo
        console.log('Form submission attempt.');

        // Perform all validations on submit
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            formSuccessMessage.classList.remove('hidden');
            console.log('Form submitted successfully with:', {
                username: usernameInput.value,
                email: emailInput.value,
                // Don't log password in real apps!
            });
            myForm.reset(); // Clear the form
            // Remove validation classes
            [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
                input.classList.remove('valid', 'invalid');
            });
            setTimeout(() => formSuccessMessage.classList.add('hidden'), 5000); // Hide after 5s
        } else {
            formSuccessMessage.classList.add('hidden');
            console.log('Form submission failed due to validation errors.');
            alert('Please correct the errors in the form.');
        }
    });

    // Pro Tip: Keep your code clean and commented – your future self will thank you!
    // Pro Tip: Think about user experience – what makes your site more fun to use?
    // Pro Tip: Don’t be afraid to Google and experiment – that’s how real developers roll!

    console.log("All JavaScript event listeners and functions have been set up. Have fun interacting! 😄");
});
