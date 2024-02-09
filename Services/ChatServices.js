const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

export async function fetchChatting(token, receiver_id, pageParam) {
  const response = await fetch(
    `${url}/chat/fetch?receiver_id=${receiver_id}&page=${pageParam}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    console.log('Error g', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function createChat(token, data) {
  const form = new FormData();
  form.append('type', data.type);
  form.append('receiver_id', data.receiver_id);
  form.append('content', data.content);
  if (data.type == 'PHOTO' || data.type == 'VIDEO') {
    form.append('media', {
      uri: data.media.path,
      type: data.media.mime,
      name: data.media.fileName,
    });
  }
  try {
    const response = await fetch(`${url}/chat/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    if (!response.ok) {
      // console.log('response not ok', response.json());
      throw new Error('Message not sent');
    }
    return response.json();
  } catch (error) {
    // console.log('error', error);
  }
}
