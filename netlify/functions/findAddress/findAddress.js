import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    // Validate and parse input
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No request body' }) };
    }

    const parsedBody = JSON.parse(event.body);
    const address = parsedBody.Text;

    if (!address) {
      return { statusCode: 400, body: JSON.stringify({ error: 'No address specified' }) };
    }

    const url = process.env.LOCATION_API_URI;
    const key = process.env.LOCATION_API_KEY;

    if (!url || !key) {
      console.error('Missing API configuration');
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing API configuration' }) };
    }

    // Prepare the request payload
    const requestBody = {
      Text: address,
      MaxResults: 5,
      FilterCountries: ["CAN"],
      FilterCategories: ["AddressType"]
    };

    // Make the request to AWS Location Services
    const response = await fetch(`${url}/search/suggestions?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    // Handle the response from AWS Location Services
    if (!response.ok) {
      const errorText = await response.text();
      return { statusCode: response.status, body: JSON.stringify({ error: errorText }) };
    }

    const data = await response.json();

    // Filter results to only include addresses in Ontario
    const ontarioAddresses = data.Results.filter(item => item.Text.includes(" ON,"));

    return {
      statusCode: 200,
      body: JSON.stringify({ Results: ontarioAddresses })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() })
    };
  }
};
