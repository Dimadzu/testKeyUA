window.addEventListener("load", function () {
    // function show modal window
    const coverElem = document.querySelector('.cover');
    const formElem = document.querySelector('.form-feedback');
    let feedbackButton = document.querySelector('.leave_feedback');
    const nameField = document.querySelector('.form-feedback__form_name');
    const emailField = document.querySelector('.form-feedback__form_email');
    const textField = document.querySelector('.text-feedback');
    const sendButton = document.querySelector('.send_btn');
    const validate = () => {
        if (
            nameField.validity.valid && emailField.validity.valid && textField.validity.valid
        ) {
            sendButton.classList.remove('invalid');
        } else {
            sendButton.classList.add('invalid');
        }
    }
    feedbackButton.addEventListener('click', () => {
        console.log(nameField)
        document.body.classList.add('notScrollable');
        coverElem.classList.remove('hidden');
        formElem.classList.remove('hidden');
    });

    coverElem.addEventListener('click', () => {
        document.body.classList.remove('notScrollable');
        coverElem.classList.add('hidden');
        formElem.classList.add('hidden');
    });

    sendButton.addEventListener('click', () => {
        if (sendButton.classList.contains('invalid')) return;
        document.body.classList.remove('notScrollable');
        coverElem.classList.add('hidden');
        formElem.classList.add('hidden');
    });

    nameField.addEventListener('input', () => {
        validate();
    });

    emailField.addEventListener('input', () => {
        validate();
    });

    textField.addEventListener('input', () => {
        validate();
    });





})