const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

export async function sendRequest(data, token) {
  console.log('data', data, token);
  const response = await fetch(`${url}/friend-request/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error sendRequest', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

// to accept or reject request
export async function updateRequest(data, token) {
  console.log('data', data, token);
  const response = await fetch(`${url}/friend-request/update-status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error updateRequest', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchFriends(token) {
  const response = await fetch(`${url}/friend-request/fetch-friends`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error fetchFriends', response.json());
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchFriendRequests(token) {
  const response = await fetch(`${url}/friend-request/fetch`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error fetchFriendRequests', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchChattingFriends(token) {
  const response = await fetch(`${url}/chat/fetch-chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error fetchChattingFriends', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
