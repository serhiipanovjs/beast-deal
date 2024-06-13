// Get the form element by its ID
const dealForm = document.getElementById("dealForm");
// Retrieve the value indicating whether the deal is accepted from localStorage
const isDealAccepted = localStorage.getItem("isDealAccepted");

// Function to handle form submission
function dealFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // If the deal is already accepted, exit the function
  if (isDealAccepted) return;

  // Extract form values into an object
  const values = Object.fromEntries([...new FormData(event.target).entries()]);
  const { deal_wish, executor, first_name, last_name } = values;
  // Get the current date in "en-uk" format
  const dateNow = new Date().toLocaleDateString("en-uk");
  // Concatenate the first and last name to form the full name
  const userFullName = `${first_name} ${last_name}`;

  // HTML template for the confirmation modal
  const dealModal = `
    <div id="confirmDealModal" class="modal_wrapper">
      <div class="modal_container">
        <div class="modal_header">
          <button aria-label="Toggle Menu" id="confirmDealButtonClose" class="burger_button menu_closed">
            <span class="menu_line"></span><span class="menu_line"></span><span class="menu_line"></span>
          </button>
        </div>
        <div class="modal_content">
          <h4>This agreement is entered into on ${dateNow}, between ${userFullName}, hereinafter referred to as the
            "Mortal" and ${executor}, hereinafter referred to as the "Executor."</h4>
          <ol class="confirmDeal_modal_content">
            <li>Background: The Mortal desires to enter into a pact with the Executor in exchange for a wish.</li>
            <li>The Mortal hereby requests the fulfillment of the wish: <br><b>${deal_wish}</b></li>
            <li>Terms and Conditions: In consideration of the fulfillment of the wishes specified above, the Mortal agrees
              to the following terms and conditions.
            </li>
            <li>Signatures: The Parties hereby execute this Agreement as of the date first written above.</li>
          </ol>
          <div class="dealModal_signatures">
            <h4>Mortal's Signature: ${userFullName}</h4>
            <h4>Executor's Signature: ${executor}</h4>
            <h4>Date: ${dateNow}</h4>
          </div>
          <button id="dealSubmitButton" aria-disabled="false" class="primary_button">SIGN</button>
        </div>
      </div>
    </div>`;

  // HTML template for the thank-you modal
  const thankYouModal = `
    <div id="thankYouModal" class="modal_wrapper">
      <div class="modal_container">
        <div class="modal_header"></div>
        <div class="modal_content">
          <div class="thank_you_modal_content">
            <h2>Thank you for your SOUL!</h2>
            <h4 class="modal_title">Your wish comes true!</h4>
            <a href="./" aria-disabled="false" class="primary_button">Return to the home page</a>
          </div>
        </div>
      </div>
    </div>`;

  // Insert the deal modal HTML into the document
  document.body.insertAdjacentHTML("beforeend", dealModal);

  // Get the modal elements by their IDs
  const modalNode = document.getElementById("confirmDealModal");
  const modalCloseButton = document.getElementById("confirmDealButtonClose");
  const dealSubmitButton = document.getElementById("dealSubmitButton");

  // Event listener for closing the modal
  modalCloseButton.addEventListener("click", () => {
    modalNode.remove();
  });

  // Event listener for submitting the deal
  dealSubmitButton.addEventListener("click", () => {
    // Save the form values and other deal details in localStorage
    localStorage.setItem("dealFormValues", JSON.stringify(values));
    localStorage.setItem("theme", "dark");
    localStorage.setItem("isDealAccepted", "true");
    // Set the theme to dark mode
    document.querySelector("html").setAttribute("data-theme", "dark");
    // Add the form values to the submit form
    addValuesToTheSubmitForm();
    // Remove the deal modal
    modalNode.remove();
    // Insert the thank you modal HTML into the document
    document.body.insertAdjacentHTML("beforeend", thankYouModal);
  });
}

// Function to populate the form with saved values and disable it
const addValuesToTheSubmitForm = () => {
  // Retrieve the saved form values from localStorage
  const savedFormValues = JSON.parse(localStorage.getItem("dealFormValues"));
  // Loop through each form element and set its value
  for (const property in dealForm.elements) {
    const currentFormElement = dealForm.elements[property];
    const savedElements = savedFormValues[property];
    currentFormElement.disabled = true;

    // Set the appropriate value for each form element based on its type
    switch (currentFormElement.type) {
      case "checkbox": {
        currentFormElement.checked = true;
        break;
      }
      case "submit": {
        currentFormElement.disabled = true;
        currentFormElement.innerText = "Your soul already sold";
        break;
      }
      default: {
        currentFormElement.value = savedElements;
      }
    }
  }
};

// Add an event listener for form submission
dealForm.addEventListener("submit", dealFormSubmit);

// If the deal is already accepted, populate the form with saved values
if (isDealAccepted) addValuesToTheSubmitForm();
