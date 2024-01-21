const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

// Login service
export async function login(data) {
  const response = await fetch(`${url}/auth/login`, {
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
  const response = await fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
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
