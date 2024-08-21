import { validateJwt } from '../validateJwt.js';
import { getNeo4jSession } from '../getNeo4jSession.js';

const handler = async function (event) {
  let decodedJwt = null;
  let eventBody = null;
  console.log('Event:', event)
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

  try {
    eventBody = JSON.parse(event.body);
    console.log('Event body:', eventBody);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body', error }),
    };
  }

  // If neo4j connection fails, return a 500 internal server error.
  const session = await getNeo4jSession();
  if (!session) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to connect to Neo4j' }),
    };
  }

  try {
    const { email, referredByCode, id, emailVerified, phone, name } = eventBody;
    // Check if referral code exists
    console.log(`Checking if referral code exists: ${referredByCode}`);
    const referralResult = await session.run(
      'MATCH (referrer:User) WHERE $referredByCode IN referrer.referralCodes RETURN referrer',
      { referredByCode }
    );

    if (referralResult.records.length === 0) {
      console.log(`Referral code ${referredByCode} not found`);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Referral code not found' }),
      };
    }

    const referrer = referralResult.records[0].get('referrer');
    console.log('Referrer found:', referrer.properties);

    // Extract necessary properties from the referrer
    const referrerId = referrer.properties.id;

    // Create new user and connect with referrer
    const createUserQuery = `
      MATCH (referrer:User {id: $referrerId})
      CREATE (newUser:User {
        id: $id,
        name: $name,
        email: $email,
        phone: $phone,
        referralCodes: [],
        joined: datetime(),
        emailVerified: $emailVerified
      })
      CREATE (referrer)-[:REFERS {referralCode: $referredByCode, notes: '', dateOfReferral: datetime(), lastContact: datetime(), preferredContactMethod: ''}]->(newUser)
      CREATE (referrer)-[:FRIENDS {becameFriends: datetime()}]->(newUser)
      CREATE (newUser)-[:FRIENDS {becameFriends: datetime()}]->(referrer)
      RETURN newUser
    `;

    console.log(`Creating new user with ID: ${id}`);
    const createUserResult = await session.run(createUserQuery, {
      id,
      name,
      email,
      phone,
      referredByCode,
      referrerId,
      emailVerified,
    });

    const newUser = createUserResult.records[0].get('newUser');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User created successfully',
        user: newUser.properties,
      }),
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500, // Changed to 500 to indicate an internal server error
      body: JSON.stringify({ error: 'An error occurred while creating the user' }),
    };
  } finally {
    await session.close();
  }
};

export { handler };
