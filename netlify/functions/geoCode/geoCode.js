import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    // Validate and parse input
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No request body' }) };
    }

    const parsedBody = JSON.parse(event.body);
    const placeId = parsedBody.placeId;

    if (!placeId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing placeId' }) };
    }

    const url = process.env.LOCATION_API_URI;
    const key = process.env.LOCATION_API_KEY;

    if (!url || !key) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Missing API configuration' }) };
    }

    // Construct the request URL
    const requestUrl = `${url}/places/${placeId}?key=${key}`;

    // Make the request to AWS Location Services
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    // Handle the response from AWS Location Services
    if (!response.ok) {
      const errorText = await response.text();
      return { statusCode: response.status, body: JSON.stringify({ error: errorText }) };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() })
    };
  }
};
