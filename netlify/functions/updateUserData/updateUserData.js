import { validateJwt } from '../validateJwt.js';
import { getNeo4jSession } from '../getNeo4jSession.js';

const handler = async function (event, context) {
  let decodedJwt = null;
  let eventBody = null;
  console.log('Event:', event)
  // Decode the event body
  try {
    eventBody = JSON.parse(event.body);
    console.log('Event body:', eventBody);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body', error }),
    };
  }

   // Validate and decode the JWT - pass function event.
   try {
    console.log('trying to validate jwt', eventBody.jwt);
    decodedJwt = await validateJwt(event);
    if (!decodedJwt || !decodedJwt.sub) {
      throw new Error('No user ID found in JWT');
    }
  } catch (error) {
    console.error('Error validating JWT:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized', error }),
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
    const cognitoId = decodedJwt.sub;

    // Check if the user exists
    const userCheckResult = await session.run(
      'MATCH (u:User {id: $cognitoId}) RETURN u',
      { cognitoId }
    );

    if (userCheckResult.records.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    // Build the update query dynamically based on the provided fields
    const updateFields = [];
    const params = { cognitoId };

    if (eventBody.name) {
      updateFields.push('u.name = $name');
      params.name = eventBody.name;
    }
    if (eventBody.referralCodes) {
      updateFields.push('u.referralCodes = $referralCodes');
      params.referralCodes = eventBody.referralCodes;
    }
    if (eventBody.phone) {
      updateFields.push('u.phone = $phone');
      params.phone = eventBody.phone;
    }
    if (eventBody.roles) {
      updateFields.push('u.roles = $roles');
      params.roles = eventBody.roles;
    }
    if (eventBody.riding) {
      updateFields.push('u.riding = $riding');
      params.riding = eventBody.riding;
    }
    if (eventBody.lastAccess) {
      updateFields.push('u.lastAccess = $lastAccess');
      params.lastAccess = eventBody.lastAccess;
    }
    if (eventBody.canContact) {
      updateFields.push('u.canContact = $canContact');
      params.canContact = eventBody.canContact;
    }

    if (updateFields.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'No fields to update' }),
      };
    }

    const updateQuery = `
      MATCH (u:User {id: $cognitoId})
      SET ${updateFields.join(', ')}
      RETURN u
    `;

    const updateUserResult = await session.run(updateQuery, params);

    const updatedUser = updateUserResult.records[0].get('u');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User updated successfully',
        user: updatedUser.properties,
      }),
    };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while updating the user' }),
    };
  } finally {
    await session.close();
  }
};

export { handler };
