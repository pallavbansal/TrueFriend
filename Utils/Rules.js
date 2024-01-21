export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password.length >= 7;
}

export function validateAddress(address) {
  return address.length > 3;
}

export function validatePhoneNumber(phoneNumber) {
  const phoneNumberRegex = /^[0-9]{10}$/;
  return phoneNumberRegex.test(phoneNumber);
}
export function validateName(name) {
  return name.length >= 3;
}
export function validateImage(image) {
  return image.length > 0;
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
  image,
}) {
  return (
    validateEmail(email) &&
    validatePassword(password) &&
    password === confirmpassword &&
    validatePhoneNumber(phone) &&
    validateName(name) &&
    validateDOB(dob) &&
    validateAddress(address) &&
    validateImage(image)
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
  image,
}) {
  const data = {
    name: false,
    email: false,
    password: false,
    confirmpassword: false,
    phone: false,
    dob: false,
    address: false,
    image: false,
  };
  if (validateEmail(email)) {
    data.email = true;
  }
  if (validatePassword(password)) {
    data.password = true;
  }
  if (password == confirmpassword && validatePassword(password)) {
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
  if (validateImage(image)) {
    data.image = true;
  }
  return data;
}
