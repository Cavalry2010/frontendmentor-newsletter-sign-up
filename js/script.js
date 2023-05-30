"use strict";

class Newsletter {
  submitBtn = document.querySelector(".subscribe-btn");
  state = document.querySelector(".newsletter-state");
  form = document.querySelector(".email-form");
  mail = document.getElementById("email");

  constructor() {
    this.form.setAttribute("novalidate", "novalidate");
    this.form.addEventListener("submit", this.submitForm.bind(this));
  }

  submitForm(e) {
    e.preventDefault();

    const input = this.mail.value;

    if (!this.validateEmail(input)) {
      this.showError("Valid email required");
      return false;
    }
    if (this.validateEmail(input)) {
      this.mail.value = "";
      this.removeError();
      this.showSuccess(input);
      return true;
    }
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  showError(message) {
    const formMessage = this.form.querySelector(".form-message");
    formMessage.textContent = message;
    this.form.classList.add("invalid-form");
  }

  removeError() {
    this.form.classList.remove("invalid-form");
  }

  showSuccess(email) {
    this.state.classList.add("transition");

    setTimeout(
      function () {
        this.state.classList.add("success-state");
        this.state.innerHTML = `
        <div class="newsletter-success">
            <img
              class="success-icon"
              src="./assets/images/icon-success.svg"
              alt="Sucess"
            />
            <h2 class="heading">Thanks for subscribing!</h2>
            <p class="sub-heading">
              A confirmation email has been sent to
              <span class="user-email">${email}</span>. Please open
              it and click the button inside to confirm your subscription.
            </p>
            <button class="btn success-btn" type="button" onClick="window.location.reload()">
              Dismiss message
            </button>
          </div>
        `;
        this.state.classList.remove("transition");
      }.bind(this),
      300
    );
  }
}

const app = new Newsletter();
