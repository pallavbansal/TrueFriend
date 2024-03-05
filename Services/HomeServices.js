const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

export async function locationUpdate(data, token) {
  console.log('location api start', data, token);
  const response = await fetch(`${url}/profile-matching/update-location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error locationupdate', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getDiscoverProfiles(token, distance) {
  console.log('discover profile api start', token, distance);
  const response = await fetch(
    `${url}/profile-matching/fetch?distance=${distance}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    console.log('Error getdiscoverprofiles', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
