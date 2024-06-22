import neo4j from 'neo4j-driver';
import { validateJwt } from '../validateJwt.js';

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

export const handler = async (event) => {
  const { jwt } = JSON.parse(event.body);
  const session = driver.session();
  const decodedJwt = await validateJwt(jwt);
  const cognitoId = decodedJwt.sub;

  if (!cognitoId) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    console.log(`Checking if user exists with ID: ${cognitoId}`);
    const result = await session.run(
      'MATCH (u:User {id: $cognitoId}) RETURN u',
      { cognitoId }
    );

    await session.close();

    const exists = result.records.length > 0;
    if (exists) {
      const userNode = result.records[0].get('u');
      console.log('User properties:', userNode.properties);
    } else {
      console.log('User does not exist.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ exists }),
    };
  } catch (error) {
    console.error('Error checking user existence:', error);
    await session.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
