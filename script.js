const form = document.getElementById("contactForm");
const alertBox = document.getElementById("formAlert");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    alertBox.innerHTML = "";
    return;
  }

  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  alertBox.innerHTML = '<div class="alert alert-info">Sending message...</div>';
  submitBtn.disabled = true;

  fetch("send_email.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text();
    })
    .then((text) => {
      alertBox.innerHTML = `<div class="alert alert-success">${text}</div>`;
      form.reset();
      form.classList.remove("was-validated");
      setTimeout(() => {
        alertBox.innerHTML = "";
      }, 5000);
    })
    .catch((error) => {
      alertBox.innerHTML =
        '<div class="alert alert-danger">Oops! Something went wrong. Please try again later.</div>';
      console.error("Error:", error);
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});