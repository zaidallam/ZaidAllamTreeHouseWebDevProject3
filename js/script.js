//selecting the elements I'll use throughout the code
let otherJob = document.getElementById('other-job-role');
let userTitle = document.getElementById('title');
let shirtDesigns = document.getElementById('shirt-designs');
let shirtColor = document.getElementById('color');
let activityRegister = document.getElementById('activities');
let activityCost = document.getElementById('activities-cost');
let activitiesTotal = 0;
let creditCardInput = document.getElementById('credit-card');
let paypalMessage = document.getElementById('paypal');
let bitcoinMessage = document.getElementById('bitcoin');
let paymentMethod = document.getElementById('payment');
let formElement = document.querySelector('form');
let nameField = document.getElementById('name');
let emailField = document.getElementById('email');

//focusing on the name field by default
document.getElementById('name').focus();

//hiding or displaying the other text field based on whether or not the other element is selected in the job role dropdown
userTitle.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJob.style = '';
    } else {
        otherJob.style = 'display: none';
    }
});

//Hiding or displaying shirt color options based on which shirt is selected
shirtDesigns.addEventListener('change', (e) => {
    shirtColor.disabled = false;
    if (e.target.value === 'js puns') {
        shirtColor.innerHTML = 
        `<option selected hidden>Select a design theme above</option>
        <option data-theme="js puns" value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
        <option data-theme="js puns" value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
        <option data-theme="js puns" value="gold">Gold (JS Puns shirt only)</option>`;
    } else if (e.target.value === 'heart js') {
        shirtColor.innerHTML = 
        `<option selected hidden>Select a design theme above</option>
        <option data-theme="heart js" value="tomato">Tomato (I &#9829; JS shirt only)</option>
        <option data-theme="heart js" value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
        <option data-theme="heart js" value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> `;
    }
});

//adding or removing the activity cost from the price total (shown below the options) when each activity is selected or removed.
activityRegister.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        let addAmount = parseInt(e.target.dataset.cost);
        if (e.target.checked) {
            activitiesTotal += addAmount;
            document.getElementById('activities-cost').textContent = `Total: $${activitiesTotal}`;
        } else {
            activitiesTotal -= addAmount;
            document.getElementById('activities-cost').textContent = `Total: $${activitiesTotal}`;
        }
    }
});

//hiding or displaying the credit card inputs, paypal notice, or bitcoin notice depending on which is selected in the dropdown.
paymentMethod.addEventListener('change', (e) => {
    if (e.target.value === 'credit-card') {
        creditCardInput.style = '';
        bitcoinMessage.style = 'display: none';
        paypalMessage.style = 'display: none';
    } else if (e.target.value === 'bitcoin') {
        creditCardInput.style = 'display: none';
        bitcoinMessage.style = '';
        paypalMessage.style = 'display: none';
    } else if (e.target.value === 'paypal') {
        creditCardInput.style = 'display: none';
        bitcoinMessage.style = 'display: none';
        paypalMessage.style = '';
    }
});

//Checking to make sure each text input is valid. If an input is not valid, warning elements are displayed and submitting is prevented
formElement.addEventListener('submit', (e) => {
    let isActivityChecked = false;
    let creditCardNumber =  document.getElementById('cc-num');
    let paymentZipCode = document.getElementById('zip');
    let paymentCVV = document.getElementById('cvv');

    //validating the name input
    if (/^\s+/.test(nameField.value) || nameField.value === '') {
        e.preventDefault();
        console.log('name is blank');
        nameField.parentNode.classList.add("not-valid");
        nameField.parentNode.classList.remove("valid");
        nameField.parentNode.lastElementChild.style.display = 'block';
    } else {
        nameField.parentNode.classList.add("valid");
        nameField.parentNode.classList.remove("not-valid");
        nameField.parentNode.lastElementChild.style.display = 'none';
    }

    //validating the email input
    if (!(/^\w+@\w+[.]com$/.test(email.value))) {
        e.preventDefault();
        console.log('email is invalid');
        email.parentNode.classList.add("not-valid");
        email.parentNode.classList.remove("valid");
        email.parentNode.lastElementChild.style.display = 'block';
    } else {
        email.parentNode.classList.add("valid");
        email.parentNode.classList.remove("not-valid");
        email.parentNode.lastElementChild.style.display = 'none';
    }

    //checking that at least one activity has been selected
    for (let i = 0; i < activityRegister.querySelectorAll('input').length; i++) {
        if (activityRegister.querySelectorAll('input')[i].checked) {
            isActivityChecked = true;
            break;
        }
    }

    //if none of the activities are selected, perform invalidating actions
    if (!isActivityChecked) {
        e.preventDefault();
        console.log('no event checked');
        activityRegister.classList.add("not-valid");
        activityRegister.classList.remove("valid");
        activityRegister.lastElementChild.style.display = 'block';
    } else {
        activityRegister.classList.add("valid");
        activityRegister.classList.remove("not-valid");
        activityRegister.lastElementChild.style.display = 'none';
    }

    //validating the credit card details, provided that the credit card option is selected
    if (paymentMethod.value === 'credit-card') {
        if (!(/^\d{13,16}$/.test(creditCardNumber.value))) {
            e.preventDefault();
            console.log('credit card number is invalid');
            creditCardNumber.parentNode.classList.add("not-valid");
            creditCardNumber.parentNode.classList.remove("valid");
            creditCardNumber.parentNode.lastElementChild.style.display = 'block';
        } else {
            creditCardNumber.parentNode.classList.add("valid");
            creditCardNumber.parentNode.classList.remove("not-valid");
            creditCardNumber.parentNode.lastElementChild.style.display = 'none';
        }
        if (!(/^\d{5}$/.test(paymentZipCode.value))) {
            e.preventDefault();
            console.log('credit card zip is invalid');
            paymentZipCode.parentNode.classList.add("not-valid");
            paymentZipCode.parentNode.classList.remove("valid");
            paymentZipCode.parentNode.lastElementChild.style.display = 'block';
        } else {
            paymentZipCode.parentNode.classList.add("valid");
            paymentZipCode.parentNode.classList.remove("not-valid");
            paymentZipCode.parentNode.lastElementChild.style.display = 'none';
        }
        if (!(/^\d{3}$/.test(paymentCVV.value))) {
            e.preventDefault();
            console.log('credit card CVV is invalid');
            paymentCVV.parentNode.classList.add("not-valid");
            paymentCVV.parentNode.classList.remove("valid");
            paymentCVV.parentNode.lastElementChild.style.display = 'block';
        } else {
            paymentCVV.parentNode.classList.add("valid");
            paymentCVV.parentNode.classList.remove("not-valid");
            paymentCVV.parentNode.lastElementChild.style.display = 'none';
        }
    }
});

//adding focus indicators to the activity elements
activityRegister.addEventListener('focus', (e) => {
    e.target.parentNode.classList.add("focus");
}, true);
activityRegister.addEventListener('blur', (e) => {
    e.target.parentNode.classList.remove("focus");
}, true);
