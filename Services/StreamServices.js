const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

export async function createStream(data, token) {
  console.log('==Stream createstream==');
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
  console.log('==Stream getstreammeetingid==');
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
  console.log('==Stream endstream==');
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

export async function getStream(token, pageParam) {
  console.log('==Stream getstream==');
  const response = await fetch(`${url}/streaming/fetch?page=${pageParam}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error getstream', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getAdjacentStream(token, streamId) {
  console.log('==Stream getadjacentstream==');
  const response = await fetch(
    `${url}/streaming/fetch-adjacent?current_stream_id=${streamId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    console.log('Error getadjacentstream', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
