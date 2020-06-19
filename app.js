// UI Elements
const form = document.querySelector("form");
const amount = document.querySelector(".amount");
const interest = document.querySelector(".interest");
const balance = document.querySelector(".balance");
const results = document.querySelector(".results");
const loader = document.querySelector(".loader");
const duration = document.querySelector(".duration");
const durationAmountInput = document.querySelector(".durationAmountInput");

// Function to Show spinner when user clicks "submit" button
const showLoader = (e) => {
  e.preventDefault();

  loader.style.display = "block";
  balance.style.display = "none";

  setTimeout(calculateResult, 2000);
};

// Function to show error when user does not enter valid data
const showError = (errorMsg) => {
  // Create error div and append to DOM
  const element = document.createElement("div");
  element.className = "error";
  element.appendChild(document.createTextNode(errorMsg));

  //   const header = document.querySelector(".header");
  //   const h1 = document.querySelector("h1-interest");
  //   const form = document.querySelector()
  const firstElement = document.querySelector(".first-element");

  form.insertBefore(element, firstElement);
  loader.style.display = "none";

  setTimeout(clearError, 2000);
};

// Function to clear Error Message
const clearError = () => {
  document.querySelector(".error").remove();
};

// Function to sync duration to interest and time
const syncValues = (e) => {
  const dnone = document.querySelector(".dnone");
  const durationAmount = document.querySelector(".duration-amount");

  let result = parseInt(e.target.value);
  // console.log(result);
  console.log();
  interest.value = result;

  if (result === 6) {
    dnone.style.display = "block";
    durationAmount.innerText = "DAYS";
  } else {
    dnone.style.display = "block";
    durationAmount.innerText = "MONTHS";
  }
};

//function to get time based on durationAmountInput
const convertInterestTime = (rate) => {
  let result;
  if (duration.value === 6) {
    result = rate / 100 / 365;
  } else {
    result = rate / 100 / 12;
  }
  return result;
};

// Function to Calculate the Interest and display result
const calculateResult = () => {
  // User entered form details
  const Principal = parseFloat(amount.value);
  const Interest = parseFloat(convertInterestTime(interest.value));
  const Time = parseFloat(durationAmountInput.value);

  console.log("principal", typeof Principal);
  console.log("interest", typeof Interest);
  console.log("time", typeof Time);

  // Check if the entered value is finite
  if (isFinite(Principal) && isFinite(Time)) {
    let InterestOnPrincipal = (Principal * Interest * Time).toFixed(2);
    let totalPayment = Principal + Number(InterestOnPrincipal);

    //Display
    balance.style.display = "block";
    results.innerText = totalPayment.toLocaleString("en", {
      maximumFractionDigits: 2,
    });
    loader.style.display = "none";
  } else {
    showError("Please check your numbers and try again");
  }
};

// Event Listener
duration.addEventListener("input", syncValues);
form.addEventListener("submit", showLoader);
