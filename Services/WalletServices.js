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
  console.log('==Wallet buyPackages==', data);
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

export async function getWallet(token, user_id) {
  console.log('==Wallet getWallet==');
  const response = await fetch(`${url}/profile/fetch-rate?user_id=${user_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error getWallet', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getDiamondTransaction(token, pageparam) {
  console.log('==Wallet getDiamondTransaction==');
  const response = await fetch(
    `${url}/profile/fetch-transactions?page=${pageparam}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    console.log('Error getDiamondTransaction', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getPaymentTransactions(token, pageparam) {
  console.log('==Wallet getpaymentTransactions==');
  const response = await fetch(
    `${url}/profile/fetch-payment-transactions?page=${pageparam}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    console.log('Error getPaymentTransactions', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
