import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

export const handler = async (event) => {
  const { cognitoId } = JSON.parse(event.body);
  const session = driver.session();

  try {
    console.log(`Fetching user data for ID: ${cognitoId}`);
    const result = await session.run(
      'MATCH (u:User {id: $cognitoId}) RETURN u',
      { cognitoId }
    );

    await session.close();

    if (result.records.length === 0) {
      return {
        statusCode: 200,
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
    await session.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
