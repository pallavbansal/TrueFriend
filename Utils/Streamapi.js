const API_BASE_URL = 'https://api.videosdk.live/v2';

export const getToken = async () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjOGRhYTQ4YS1iZjVlLTQ1YmItODBmYi00ODc0NjBiNzg1MzciLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMDk5Njg0MiwiZXhwIjoxNzI2NTQ4ODQyfQ.SzpODNF5ThmmFJPWBsyScnooE6C62HiplWXUvoGdCdI';
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
