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

  // Return 200 if user exists, 404 if not, and 500 if something goes wrong.
  try {
    console.log(`Checking if user exists with ID: ${cognitoId}`);
    const result = await session.run(
      'MATCH (u:User {id: $cognitoId}) RETURN u',
      { cognitoId }
    );

    const exists = result.records.length > 0;
    if (exists) {
      console.log('User exists');
      return {
        statusCode: 200,
      };
    } else {
      console.log('User does not exist');
      return {
        statusCode: 404,
      };
    }
  } catch (e) {
    console.error('Error checking user existence:', e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error checking user existence' }),
    };
  } finally {
    await session.close();
  }
};
