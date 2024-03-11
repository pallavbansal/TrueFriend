const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

export async function CreateReport(data, token) {
  console.log('==Report CreateReport==');
  const formData = new FormData();
  formData.append('reason', data.reason);
  formData.append('reported_user_id', data.reported_user_id);
  formData.append('media', {
    uri: data.media[0].path,
    type: data.media[0].mime,
    name: data.media[0].fileName,
  });

  const response = await fetch(`${url}/report/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    console.log('Error createReport', response);
    throw new Error('Network response was not ok');
  }

  return response.json();
}
