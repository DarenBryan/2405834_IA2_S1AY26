//Retrieves stored login data from localStorage
const loginData = JSON.parse(localStorage.getItem("userData")) || [];

// Handles login form submission
document.getElementById("Loginform").addEventListener("submit", function(event) {
    event.preventDefault();
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        if (username === loginData.username && password === loginData.password) {
            window.open("Products.html", "_self"); 
        } else {
            alert("Invalid username or password. Please try again.");
        }
    } catch (error) {
        alert("An error occurred during login. Please try again later.");
    }
});

//Redirects to registration page
document.getElementById("register").addEventListener("click", function() {
    window.open("RegistrationPage.html", "_self");
});
