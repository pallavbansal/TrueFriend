const API_BASE_URL = 'https://api.videosdk.live/v2';

export const getToken = async () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjOGRhYTQ4YS1iZjVlLTQ1YmItODBmYi00ODc0NjBiNzg1MzciLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwNzEwOTkwNSwiZXhwIjoxNzA3NzE0NzA1fQ._i5DFaPIOIGm3UsyYL-ya4S7m4TkCUNOEpVrSDUI7w4';
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

  console.log('room', roomId);
  return roomId;
};
