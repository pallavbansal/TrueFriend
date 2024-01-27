const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

export async function profileCreation(data, token) {
  console.log('data', data, token);
  const response = await fetch(`${url}/profile/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error g', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchProfile(token) {
  const response = await fetch(`${url}/profile/fetch`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error g', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function updateProfile(data, token) {
  const formData = new FormData();
  formData.append('mobile_number', data.mobile_number);
  formData.append('bio', data.bio);
  formData.append('sex', data.sex);
  formData.append('marital_status', data.marital_status);
  formData.append('looking_for', data.looking_for);
  formData.append('religion', data.religion);
  formData.append('drinking', data.drinking);
  formData.append('smoking', data.smoking);
  if (data.profile_picture.path) {
    formData.append('profile_picture', {
      uri: data.profile_picture.path,
      type: data.profile_picture.mime,
      name: data.profile_picture.fileName,
    });
  }
  try {
    const response = await fetch(`${url}/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
    console.log('response', response);
    return response.json();
  } catch (error) {}
}
