export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password.length >= 7;
}

export function validateAddress(address) {
  console.log('address', address);
  return address.length > 0;
}

export function validatePhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^[0-9]{10}$/;
  return phoneNumberRegex.test(phoneNumber);
}
export function validateName(name) {
  return name.length >= 3;
}

export function validateDOB(dob) {
  const dobDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dobDate.getFullYear();
  return age >= 18;
}

export function validateRegistrationForm({
  email,
  password,
  confirmpassword,
  phone,
  name,
  dob,
  address,
}) {
  return (
    validateEmail(email) &&
    validatePassword(password) &&
    password === confirmpassword &&
    validatePhoneNumber(phone) &&
    validateName(name) &&
    validateDOB(dob) &&
    validateAddress(address)
  );
}

export function validateinputs({
  email,
  password,
  confirmpassword,
  phone,
  name,
  dob,
  address,
}) {
  const data = {
    name: false,
    email: false,
    password: false,
    confirmpassword: false,
    phone: false,
    dob: false,
    address: false,
  };
  if (validateEmail(email)) {
    data.email = true;
  }
  if (validatePassword(password)) {
    data.password = true;
  }
  if (password == confirmpassword) {
    data.confirmpassword = true;
  }
  if (validatePhoneNumber(phone)) {
    data.phone = true;
  }
  if (validateName(name)) {
    data.name = true;
  }
  if (validateDOB(dob)) {
    data.dob = true;
  }
  if (validateAddress(address)) {
    data.address = true;
  }
  return data;
}

export const emailValidationText = 'Please enter a valid email address.';
export const passwordValidationText =
  'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.';
export const phoneNumberValidationText =
  'Please enter a valid phone number (10 digits).';
export const nameValidationText =
  'Name must be at least 2 characters long and can only contain letters and spaces.';
export const dobValidationText = 'You must be at least 18 years old.';
