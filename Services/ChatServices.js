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
    console.log('Error fetchChatting', response);
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
      console.log('Error createChat', response);
      throw new Error('Message not sent');
    }
    return response.json();
  } catch (error) {
    // console.log('error', error);
  }
}

// const groupData = {
//   name: "Group 5",
//   user_ids: [2, 3]
// };

export async function createGroup(token, data) {
  const response = await fetch(`${url}/group/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error createGroup', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function fetchGroupData(token, group_id) {
  const response = await fetch(`${url}/group/fetch?group_id=${group_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error fetchGroupData', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function leaveGroup(token, data) {
  const response = await fetch(`${url}/group/leave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error leaveGroup', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function addUserToGroup(token, data) {
  const response = await fetch(`${url}/group/add-users-to-group`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error addUserToGroup', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function removeUserFromGroup(token, data) {
  const response = await fetch(`${url}/group/remove-users-from-group`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error removeUserFromGroup', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function editGroupName(token, data) {
  const response = await fetch(`${url}/group/edit-name`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error editGroupName', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
