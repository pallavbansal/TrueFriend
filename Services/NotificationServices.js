import {BACKEND_API_URL} from '@env';
const url = BACKEND_API_URL;

export async function fetchNotifications(token, pageParam) {
  console.log('==Chat FetchNotifications==');
  const response = await fetch(`${url}/notification/fetch?page=${pageParam}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error fetchNotifications', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
