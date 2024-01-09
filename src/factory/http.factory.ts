const makeAuthorization = () => `Bearer ${localStorage.getItem('token')}`;

export const httpHeadersFactory = () => ({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Authorization': makeAuthorization()
})