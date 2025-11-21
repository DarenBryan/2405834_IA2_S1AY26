//Handles registration form submission: reading inputs and saving it to Local Storage using an Array
document.getElementById("Registrationform").addEventListener("submit", function(event) {
    event.preventDefault();
    try {
        const username = document.getElementById("Username").value;
        const password = document.getElementById("Password").value;
        const email = document.getElementById("Email").value;
        const DOB = document.getElementById("DOB").value;
        const FirstName = document.getElementById("FirstName").value;
        const LastName = document.getElementById("LastName").value;
        const confirmPassword = document.getElementById("ConfirmPassword").value;

        if (!username || !password || !confirmPassword || !email || !DOB || !FirstName || !LastName) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        try {
            const userData = {
                username: username,
                password: password,
                email: email,
                DOB: DOB,
                FirstName: FirstName,
                LastName: LastName
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            alert("Registration successful!");
            window.open("../LoginPage.html", "_self");
        } catch (storageError) {
            alert("Failed to save user data. Please try again.");
            return;
        }
    } catch (error) {
        alert("An error occurred during registration. Please try again later.");
    }  
});

    