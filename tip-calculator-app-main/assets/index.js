// Get references to HTML elements
const billInput = document.getElementById('bill-input');
const button = document.querySelectorAll('.btn');
const customTip = document.getElementById('tip-input');
const people = document.getElementById('people-input');
const tipValue = document.querySelector('.tip-value');
const totalValue = document.querySelector('.total-value');
const peopleError = document.getElementById('people-error');
const resetBtn = document.querySelector('.reset-btn');

// Set initial values for bill, people, and tip
let billVal = 0;
let peopleVal = 1;
let tipVal = 0.15;

// Listen for input events on bill input field
billInput.addEventListener('input', validateBill);

// Function to validate and update bill value
function validateBill() {
  if (billInput.value.includes(',')) {
    billInput.value = billInput.value.replace(',', '.');
  }
  billVal = parseFloat(billInput.value);
  calculate();
}

// Listen for input events on custom tip input field
customTip.addEventListener('input', tipCustomVal);

// Function to update tip value when custom tip is selected
function tipCustomVal() {
  tipVal = parseFloat(customTip.value) / 100;
  button.forEach((btn) => {
    btn.classList.remove('active');
  });
  if (customTip.value !== '') {
    calculate();
  }
}

// Listen for input events on number of people input field
people.addEventListener('input', setPeopleVal);

// Function to update people value
function setPeopleVal() {
  peopleVal = parseFloat(people.value);
  if (peopleVal <= 0) {
    peopleError.innerHTML = 'number must be greater than zero';
    setTimeout(function () {
      peopleError.innerHTML = '';
    }, 2000);
  }
  calculate();
}

// Listen for click events on tip percentage buttons
button.forEach((btn) => {
  btn.addEventListener('click', handleClick);
});

// Function to handle click events on tip percentage buttons
function handleClick(event) {
  button.forEach((btn) => {
    btn.classList.remove('active');
    if (event.target.innerHTML === btn.innerHTML) {
      btn.classList.add('active');
      tipVal = parseFloat(btn.innerHTML) / 100;
    }
  });
  customTip.value = '';
  calculate();
}


// Calculate tip and total amounts based on bill, tip, and number of people
function calculate() {
    if (billVal && peopleVal >= 1) {
      let tip = billVal * tipVal / peopleVal;
      let totalAmount = billVal * (tipVal + 1) / peopleVal;
  
      tipValue.innerHTML = tip.toFixed(2);
      totalValue.innerHTML = totalAmount.toFixed(2);
    } else {
      tipValue.innerHTML = '0.00';
      totalValue.innerHTML = '0.00';
    }
  }

// Reset all input values to default and disable the reset button
function handleReset() {
    resetBtn.disabled = true;
    resetBtn.style.backgroundColor = 'darkcyan';
  
    billInput.value = '';
    validateBill();
  
    button.forEach((btn) => {
      btn.classList.remove('active');
    });
    customTip.value = '';
  
    people.value = '1';
    setPeopleVal();
  
    calculate();
  }
  
  // Listen for input events on bill, customTip, and people input fields
  billInput.addEventListener('input', enableReset);
  customTip.addEventListener('input', enableReset);
  people.addEventListener('input', enableReset);
  
  // Function to enable reset button and set the background color to its original state
  function enableReset() {
    if (resetBtn.disabled) {
      resetBtn.disabled = false;
      resetBtn.style.backgroundColor = ''; //set this to the original background color
    }
  }
  
  // Initialize the reset button as disabled and dark cyan
  resetBtn.disabled = true;
  resetBtn.style.backgroundColor = 'darkcyan';
  
  // Listen for click events on reset button
  resetBtn.addEventListener('click', handleReset);
  

