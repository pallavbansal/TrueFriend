const url = 'https://wooing.boxinallsoftech.com/public/api/v1';

export async function CreatePost(data, token) {
  console.log('==Feed CreatePost==');
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
    console.log('Error createPost', response);
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function getSocialFeedPosts(token, page) {
  console.log('==Feed getsocialfeedposts==');
  const response = await fetch(`${url}/post/fetch?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.log('Error getSocialFeedPosts', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function likePost(token, postid) {
  console.log('==Feed Likepost==');
  const response = await fetch(`${url}/post/like-post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({post_id: postid}),
  });
  if (!response.ok) {
    console.log('Error likepost', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function dislikePost(token, postid) {
  console.log('==Feed dislikepost==');
  const response = await fetch(`${url}/post/dislike-post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({post_id: postid}),
  });
  if (!response.ok) {
    console.log('Error dislikepost', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getPostComments(token, postid, page) {
  console.log('==Feed getpostcomments==');
  const response = await fetch(
    `${url}/comment/fetch?post_id=${postid}&page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    console.log('Error getpostcomments', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function createPostComment(token, data) {
  console.log('==Feed createpostcomments==');
  const response = await fetch(`${url}/comment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error createpostcomment', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function createCommentReply(token, data) {
  console.log('==Feed createcommentreply==');
  const response = await fetch(`${url}/comment/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log('Error createcommentreply', response);
    throw new Error('Network response was not ok');
  }
  return response.json();
}
