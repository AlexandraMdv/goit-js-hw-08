import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

const LOCAL_STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(handleInput, 500));

function handleInput() {
    const formData = {
        email: email.value,
        message: message.value
    }

    // console.log(formData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

handlePageLoad();

function handlePageLoad() {
    const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if(savedData) {
        email.value = savedData.email;
        message.value = savedData.message;
    }
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    if(email.value === '' || message.value === '') {
        alert('Please complete both inputs!');
        form.reset();
    }

    const formData = {
        email: email.value, 
        message: message.value
    };

    console.log(formData);

    form.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
}

