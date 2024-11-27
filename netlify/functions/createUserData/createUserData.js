import { validateJwt } from '../validateJwt.js';
import { getNeo4jSession } from '../getNeo4jSession.js';

const handler = async function (event) {
  let decodedJwt = null;
  let eventBody = null;
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


    // Create new user and connect with referrer
    var createUserQuery = `
      CREATE (user:User {
        id: $id,
        name: $name,
        email: $email,
        phone: $phone,
        referralCodes: [],
        joined: datetime(),
        emailVerified: $emailVerified
      })

      RETURN user
    `;

    const opts = {
      id,
      name,
      email,
      phone,
      referredByCode,
      emailVerified,
    };
    console.log(`Creating new user with CYPHER: ${createUserQuery}\nOPTS: ${JSON.stringify(opts,null,2)}`);
    const createUserResult = await session.run(createUserQuery, opts);


    const newUser = createUserResult.records[0].get('user');

    var referralCreated = false;
    if(referredByCode) {
      try
      {
        var createReferralsQuery = `
          MATCH(user:User{id: $id})
          MATCH(referralCode:ReferralCode{code: $referredByCode })
          MATCH(referralCode)<-[:OWNS]-(referrer:User)


          CREATE (referrer)-[:REFERRED {referralCode: referralCode.code, notes: '', dateOfReferral: datetime(), lastContact: datetime(), preferredContactMethod: ''} ]->(user)
          CREATE (user)-[:REFERRED_BY {referralCode: referralCode.code, notes: '', dateOfReferral: datetime(), lastContact: datetime(), preferredContactMethod: ''}]->(referrer)

          return user, referralCode
        `;
      const opts = {
        id,
        referredByCode,
      };
      console.log(`Creating referral relationship with CYPHER: ${createReferralsQuery}\nOPTS: ${JSON.stringify(opts,null,2)}`);
      const referralResult = await session.run(createReferralsQuery, opts);

      const newUser = referralResult.records[0].get('user');
      const referralCode = referralResult.records[0].get('referralCode')
      if(referralCode){
        referralCreated = true;
      } 

      } catch (error) {
        console.error('Error creating referral:', error);
        return {
          statusCode: 500, // Changed to 500 to indicate an internal server error
          body: JSON.stringify({ error: 'An error occurred while creating the referral' }),
        };

      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User created successfully',
        user: newUser.properties,
        referralCreated,
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
