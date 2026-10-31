
const form = document.querySelector("#event-form");
const typeSelect = document.querySelector("#type");
const identityField = document.querySelector("#identity-field");
const identityLabel = document.querySelector("#identity-label");
const identityInput = document.querySelector("#identity");
const identityHelp = document.querySelector("#identity-help");
const dateInput = document.querySelector("#event-date");
const errorsBox = document.querySelector("#errors");
const ticketBox = document.querySelector("#ticket");

const ACCESS_CODE = "EVENT131";

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

dateInput.min = getToday();

function updateIdentityField() {
  const type = typeSelect.value;

  identityField.hidden = !type;
  identityInput.disabled = !type;
  identityInput.value = "";

  if (type === "student") {
    identityLabel.textContent = "Student I#";
    identityInput.placeholder = "Enter your 9-digit Student I#";
    identityInput.maxLength = 9;
    identityInput.minLength = 9;
    identityInput.pattern = "[0-9]{9}";
    identityHelp.textContent = "Enter exactly 9 digits.";
  }

  if (type === "guest") {
    identityLabel.textContent = "Access Code";
    identityInput.placeholder = "Enter access code";
    identityInput.maxLength = 8;
    identityInput.minLength = 8;
    identityInput.pattern = "EVENT131";
    identityHelp.textContent = "Enter EVENT131.";
  }
}

typeSelect.addEventListener("change", updateIdentityField);

function showErrors(messages) {
  errorsBox.replaceChildren();

  const heading = document.createElement("strong");
  heading.textContent = "Please fix these errors:";

  const list = document.createElement("ul");

  messages.forEach(message => {
    const item = document.createElement("li");
    item.textContent = message;
    list.appendChild(item);
  });

  errorsBox.append(heading, list);
  errorsBox.hidden = false;
  ticketBox.hidden = true;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  errorsBox.hidden = true;
  ticketBox.hidden = true;

  const errors = [];

  const firstName = form.elements.firstName.value.trim();
  const lastName = form.elements.lastName.value.trim();
  const email = form.elements.email.value.trim();
  const eventDate = dateInput.value;
  const type = typeSelect.value;
  const identity = identityInput.value.trim();

  if (firstName.length < 2 || firstName.length > 30) {
    errors.push("Enter a valid first name (2-30 characters).");
  }

  if (lastName.length < 2 || lastName.length > 30) {
    errors.push("Enter a valid last name (2-30 characters).");
  }

  if (!email || !form.elements.email.validity.valid) {
    errors.push("Enter a valid email address.");
  }

  if (!type) {
    errors.push("Select Student or Guest.");
  }

  if (!eventDate || eventDate <= getToday()) {
    errors.push("Choose a future event date.");
  }

  if (type === "student" && !/^[0-9]{9}$/.test(identity)) {
    errors.push("Student I# must contain exactly 9 digits.");
  }

  if (type === "guest" && identity !== ACCESS_CODE) {
    errors.push("Access Code must be EVENT131.");
  }

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  document.querySelector("#ticket-name").textContent =
    `Name: ${firstName} ${lastName}`;

  document.querySelector("#ticket-type").textContent =
    `Type: ${type === "student" ? "Student" : "Guest"}`;

  document.querySelector("#ticket-date").textContent =
    `Event Date: ${eventDate}`;

  document.querySelector("#ticket-email").textContent =
    `Email: ${email}`;

  ticketBox.hidden = false;

  form.reset();
  identityField.hidden = true;
  identityInput.disabled = true;
});
