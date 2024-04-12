import {BACKEND_API_URL} from '@env';
const url = BACKEND_API_URL;

export async function getPackages(token) {
  console.log('==Wallet getPackages==');
  const response = await fetch(`${url}/wallet/fetch-packages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error getPackages', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function buyPackages(token, data) {
  console.log('==Wallet buyPackages==');
  const response = await fetch(`${url}/wallet/buy-package`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error buyPackages', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getOrderId(token) {
  const response = await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        order_id: Math.floor(Math.random() * 1000000).toString(), // generates a random number between 0 and 999999
      });
    }, 100); // delay of 1 second
  });

  return response;
}
