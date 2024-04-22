const API_BASE_URL = 'https://api.videosdk.live/v2';

export const getToken = async () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI1NTAzMGU5OC02MGEwLTQ4MGUtODQ5OC01NzRjOGVmMjJjYTkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMzc4MjIwMCwiZXhwIjoxODcxNTcwMjAwfQ.-BQxNCVT2F16M3a7WQnAisH5lxaXrLDZ53AfZqNz3Ls';
};

export const createMeeting = async ({token}) => {
  const url = `${API_BASE_URL}/rooms`;
  const options = {
    method: 'POST',
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  };

  const {roomId} = await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error('error', error));

  console.log('-------------room--------------', roomId);
  return roomId;
};
