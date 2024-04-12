const API_BASE_URL = 'https://api.videosdk.live/v2';

export const getToken = async () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIxMGNhMzJkYy01NWRjLTQwOTUtYTZiMC1iNDY2ZDhiNTY5YjkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMjU2OTIwMywiZXhwIjoxNzQ0MTA1MjAzfQ.gEsOIkDIUKjFQCM6HP1PvMHhORcG8pOXpMK_3yXt_H4';
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
