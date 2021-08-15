// CleverTap Login Function
function customFunction(type) {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let dob = document.getElementById('dob');

    // Validating all the input fields
    if ((name.value && email.value && phone.value && dob.value) === '' || null) {
        if (name.value) {
            document.getElementById('name-error').hidden = true;
        } else if (email.value) {
            document.getElementById('email-error').hidden = true;
            email.validationMessage ? document.getElementById('email-pattern').innerHTML = email.validationMessage : document.getElementById('email-pattern').innerHTML = '';
        } else if (phone.value) {
            document.getElementById('phone-error').hidden = true;
        } else if (dob.value) {
            document.getElementById('dob-error').hidden = true;
        }
        name.value === '' || name.value === null ? name.style.borderColor = '#dc3544' : name.style.borderColor = '';
        name.value === '' || name.value === null ? document.getElementById('name-error').hidden = false : null;

        email.value === '' || email.value === null ? email.style.borderColor = '#dc3544' : email.style.borderColor = '';
        email.value === '' || email.value === null ? document.getElementById('email-error').hidden = false : null;
        email.value === '' || email.value === null ? document.getElementById('email-pattern').innerHTML = '' : null;

        phone.value === '' || phone.value === null ? phone.style.borderColor = '#dc3544' : phone.style.borderColor = '';
        phone.value === '' || phone.value === null ? document.getElementById('phone-error').hidden = false : null;

        dob.value === '' || dob.value === null ? dob.style.borderColor = '#dc3544' : dob.style.borderColor = '';
        dob.value === '' || dob.value === null ? document.getElementById('dob-error').hidden = false : null;

    } else if (name.value && email.value && phone.value && dob.value) { //If all fields are valid then proceed to the API call

        name.style.borderColor = '#dc3544' ? name.style.borderColor = '' : null;
        document.getElementById('name-error').hidden = true;

        email.style.borderColor = '#dc3544' ? email.style.borderColor = '' : null;
        document.getElementById('email-error').hidden = true;

        phone.style.borderColor = '#dc3544' ? phone.style.borderColor = '' : null;
        document.getElementById('phone-error').hidden = true;

        dob.style.borderColor = '#dc3544' ? dob.style.borderColor = '' : null;
        document.getElementById('dob-error').hidden = true;

        if (type === 1) {
            document.getElementById('login-spinner').hidden = false;
            document.getElementById('login-btn').setAttribute('disabled', 'true');

            // Calling the CleverTap onUserLogin API
            clevertap.onUserLogin.push({
                "Site": {
                    "Name": name.value,
                    "Email": email.value,
                    "Phone": "+91" + phone.value,
                    "DOB": new Date(dob.value)
                }
            });
            setTimeout(() => {
                name.value = '';
                phone.value = '';
                email.value = '';
                dob.value = new Date();
                document.getElementById('login-spinner').hidden = true;
                document.getElementById('login-btn').removeAttribute('disabled');
                console.log('Clevertap onUserLogin API call complete.....');
                alert('Clevertap onUserLogin API call complete.....');                
            }, 2000);
        } else if (type === 2) {
            document.getElementById('profile-spinner').hidden = false;
            document.getElementById('profile-btn').setAttribute('disabled', 'true');

            // Calling the CleverTap ProfilePush API
            clevertap.profile.push({
                "Site": {
                    "Name": name.value,
                    "Email": email.value,
                    "Phone": "+91" + phone.value,
                    "DOB": new Date(dob.value)
                }
            });
            setTimeout(() => {
                name.value = '';
                phone.value = '';
                email.value = '';
                dob.value = new Date();
                document.getElementById('profile-spinner').hidden = true;
                document.getElementById('profile-btn').removeAttribute('disabled');
                console.log('Clevertap ProfilePush API call complete.....');
                alert('Clevertap ProfilePush API call complete.....');                
            }, 2000);
        }
    }
};

//   CleverTap Ask For Push Function
function askPush() {
   if (location.protocol == 'https:') {
        document.getElementById('push-spinner').hidden = false;
        document.getElementById('push-btn').setAttribute('disabled', 'true');
        clevertap.notifications.push({
            "titleText": 'Would you like to receive Push Notifications?',
            "bodyText": 'We promise to only send you relevant content and give you updates on your transactions',
            "okButtonText": 'Sign me up!',
            "rejectButtonText": 'No thanks',
            "askAgainTimeInSeconds": 5,
            "okButtonColor": '#f28046'
        });
        setTimeout(() => {
            document.getElementById('push-spinner').hidden = true;
            document.getElementById('push-btn').removeAttribute('disabled');
            console.log('Clevertap askPush API call complete.....');
            alert('Clevertap askPush API call complete.....');            
        }, 2000);
    } else {
        alert('This API requires to be called over HTTPS');
    }
};

// CleverTap Raise Event Function

function raiseEvent() {
    document.getElementById('event-spinner').hidden = false;
    document.getElementById('event-btn').setAttribute('disabled', 'true');
    // event with properties
    clevertap.event.push("Product viewed", {
        "Product name": "Casio Chronograph Watch",
        "Category": "Mens Accessories",
        "Price": 59.99,
        "Date": new Date()
    });
    setTimeout(() => {
        document.getElementById('event-spinner').hidden = true;
        document.getElementById('event-btn').removeAttribute('disabled');
        console.log('Clevertap raiseEvent API call complete.....');
        alert('Clevertap raiseEvent API call complete.....');        
    }, 2000);
}

