import {BACKEND_API_URL} from '@env';
const url = BACKEND_API_URL;

export async function profileCreation(data, token) {
  console.log('==Profile  profilecreation==');
  const response = await fetch(`${url}/profile/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error profilecreation', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchProfile(token) {
  console.log('==Profile  fetchprofile==');
  const response = await fetch(`${url}/profile/fetch`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error fetchprofile', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchProfileById(id, token) {
  console.log('==Profile  fetchprofilebyid==');
  const response = await fetch(
    `${url}/profile/fetch-profile-by-id?user_id=${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    console.log('Error fetchprofilebyid', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function updateProfile(data, token) {
  console.log('==Profile  updateprofile==');
  const formData = new FormData();
  formData.append('mobile_number', data.mobile_number);
  formData.append('bio', data.bio);
  formData.append('sex', data.sex);
  formData.append('marital_status', data.marital_status);
  formData.append('looking_for', data.looking_for);
  formData.append('religion', data.religion);
  formData.append('drinking', data.drinking);
  formData.append('smoking', data.smoking);
  formData.append('call_amount', data.call_amount);
  if (data.profile_picture.path) {
    formData.append('profile_picture', {
      uri: data.profile_picture.path,
      type: data.profile_picture.mime,
      name: data.profile_picture.fileName,
    });
  }
  try {
    console.log('formData', formData);
    const response = await fetch(`${url}/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.log('Error updateprofile', response);
      throw new Error('Registration failed');
    }
    console.log('response', response);
    return response.json();
  } catch (error) {}
}

export async function deleteSocialFeed(data, token) {
  console.log('==Profile  deleteSocialFeed==', data.id);
  const response = await fetch(`${url}/post/delete?post_id=${data.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error deleteSocialFeed', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
