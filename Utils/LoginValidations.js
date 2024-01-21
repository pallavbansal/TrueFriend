export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function validatePassword(password) {
  return password.length >= 7;
}

export function validateLoginInputs({email, password}) {
  if (validateEmail(email) && validatePassword(password)) {
    return true;
  }
  return false;
}
