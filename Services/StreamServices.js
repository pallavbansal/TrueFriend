const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

export async function createStream(data, token) {
  const response = await fetch(`${url}/streaming/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error createstream', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
export async function getStreamMeetingId(data, token) {
  const response = await fetch(`${url}/streaming/fetch-by-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error getstreammeetingid', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function endStream(token) {
  const response = await fetch(`${url}/profile/fetch`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error endstream', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
