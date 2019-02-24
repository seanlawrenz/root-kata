import fetch from 'cross-fetch';

export const APIRequest = async (url, requestMethod, body) => {
  const apiUrl = `api${url}`;
  let data;
  try {
    const method = requestMethod === undefined ? 'GET' : requestMethod;

    if (body !== undefined) {
      body = await JSON.stringify(body);
    }

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method,
      body,
    });

    if (!response.ok)  {
      throw Error(response.statusText);
    }

    data = await response.json();
  } catch(error) {
    console.error(error);
  }
  return data;
}