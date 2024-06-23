import { validateJwt } from '../validateJwt.js';
import { getNeo4jSession } from '../getNeo4jSession.js';

export const handler = async (event) => {
  let decodedJwt = null;

  // Validate and decode the JWT - pass function event.
  try {
    decodedJwt = await validateJwt(event);
    if (!decodedJwt || !decodedJwt.sub) {
      throw new Error('No user ID found in JWT');
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized', error }),
    };
  }

  const cognitoId = decodedJwt.sub;

  // If neo4j connection fails, return a 500 internal server error.
  const session = await getNeo4jSession();
  if (!session) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to Neo4j' }),
    };
  }

  try {
    console.log(`Fetching user data for ID: ${cognitoId}`);
    const result = await session.run(
      'MATCH (u:User {id: $cognitoId}) RETURN u',
      { cognitoId }
    );


    if (result.records.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    const user = result.records[0].get('u').properties;

    console.log('Fetched user data from neo4j:', user);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await session.close();
  }
};
