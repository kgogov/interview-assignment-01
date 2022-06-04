class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener('submit', event => {
      let isFormInvalid = false;

      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        self.validateFields(input);

        if (input.getAttribute('data-is-valid') === 'false') {
          isFormInvalid = true;
        }
      });

      if (isFormInvalid) {
        event.preventDefault();
      }
    });
  }

  validateOnEntry() {
    let self = this;

    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`);

      input.addEventListener('input', event => {
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    if (field.id === 'firstName' || field.id === 'lastName') {
      const re = /^[a-zA-Z ]+$/;

      if (re.test(field.value)) {
        this.setStatus(field, null, 'success');
      } else {
        this.setStatus(field, 'Please enter a valid name', 'error');
      }
    }

    if (field.id === "email") {
      const re = /\S+@\S+\.\S+/;

      if (re.test(field.value)) {
        this.setStatus(field, null, 'success');
      } else {
        this.setStatus(field, 'Please enter a valid email address', 'error');
      }
    }
  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector('.icon-success');
    const errorIcon = field.parentElement.querySelector('.icon-error');
    const errorMessage = field.parentElement.querySelector('.error-message');

    if (status === "success") {
      if (errorIcon) { errorIcon.classList.add('hidden') }
      if (errorMessage) { errorMessage.innerText = "" }

      successIcon.classList.remove('hidden');

      field.classList.remove('input-error');
      field.setAttribute('data-is-valid', true);
    }

    if (status === "error") {
      if (successIcon) { successIcon.classList.add('hidden') }

      field.parentElement.querySelector('.error-message').innerText = message;
      errorIcon.classList.remove('hidden');

      field.classList.add('input-error');
      field.setAttribute('data-is-valid', false);
    }
  }
}

const form = document.querySelector('#form');
const formFields = ['firstName', 'lastName', 'email'];

const validator = new FormValidator(form, formFields);
validator.initialize();
