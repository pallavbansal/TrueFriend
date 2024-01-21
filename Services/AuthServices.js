const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

// Login service
export async function login(data) {
  const response = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Invalid Credentials');
  }
  return response.json();
}
// Verify service
export async function verify(data) {
  const response = await fetch(`${url}/auth/register/verify`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
// Forgot Password service
export async function forgotPassword(data) {
  const response = await fetch(`${url}/auth/forget-password`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

// Register service
export async function register(data) {
  const formData = new FormData();
  formData.append('city', data.city);
  formData.append('dob', data.dob);
  formData.append('email', data.email);
  formData.append('mobile_number', data.mobile_number);
  formData.append('name', data.name);
  formData.append('password', data.password);
  formData.append('profile_picture', {
    uri: data.profile_picture.path,
    type: data.profile_picture.mime,
    name: data.profile_picture.fileName,
  });
  try {
    const response = await fetch(`${url}/auth/register`, {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  } catch (error) {}
}
