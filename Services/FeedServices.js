const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

// export async function CreatePost(data, token) {
//   const formData = new FormData();
//   formData.append('caption', data.caption);
//   formData.append('media_type', data.media_type);
//   formData.append('media', {
//     uri: data.media.path,
//     type: data.media.mime,
//     name: data.media.fileName,
//   });
//   const response = await fetch(`${url}/post/create`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });
//   if (!response.ok) {
//     console.log('Create Post Error 1', response);
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// }

export async function CreatePost(data, token) {
  const formData = new FormData();
  formData.append('caption', data.caption);

  data.media_type.forEach((type, index) => {
    formData.append(`media_type[${index}]`, type);
  });

  data.media.forEach((mediaItem, index) => {
    formData.append(`media[${index}]`, {
      uri: mediaItem.path,
      type: mediaItem.mime,
      name: mediaItem.fileName,
    });
  });

  const response = await fetch(`${url}/post/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    console.log('Create Post Error 1', response);
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function getSocialFeedPosts(token, page) {
  // console.log('token in api', page);
  const response = await fetch(`${url}/post/fetch?page=${page}`, {
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

export async function likePost(token, postid) {
  const response = await fetch(`${url}/post/like-post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({post_id: postid}),
  });
  if (!response.ok) {
    console.log('Error g', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function dislikePost(token, postid) {
  const response = await fetch(`${url}/post/dislike-post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({post_id: postid}),
  });
  if (!response.ok) {
    console.log('Error g', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
