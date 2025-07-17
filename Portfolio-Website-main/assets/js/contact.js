<!-- Include EmailJS SDK -->
    <script src="https://cdn.emailjs.com/dist/email.min.js"></script>

    <script>
    document.addEventListener("DOMContentLoaded", function () {
        emailjs.init("bUnQMliD_jfgCq9VA"); // Your public key

        const form = document.getElementById("contact-form");

        form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Send the main contact message
        emailjs.sendForm("contact_service", "template_60rvlc9", form)
            .then(function (response) {
            console.log("Main message sent:", response.status, response.text);

            // After that, send the auto-reply to the user
            const userEmail = form.querySelector("input[name='email']").value;

            // Optional: If your auto-reply template uses additional dynamic fields
            const replyParams = {
                user_email: userEmail,
                user_name: form.querySelector("input[name='name']").value,
            };

            emailjs.send("contact_service", "template_c9ecycr", replyParams)
                .then(function (response2) {
                console.log("Auto-reply sent:", response2.status, response2.text);
                alert("Form submitted successfully. Check your email!");
                form.reset();
                }, function (error2) {
                console.error("Auto-reply failed:", error2);
                alert("Form sent, but auto-reply failed.");
                form.reset();
                });

            }, function (error) {
            console.error("Form submission failed:", error);
            alert("Form submission failed. Try again later.");
            });
        });
    });
    </script>
