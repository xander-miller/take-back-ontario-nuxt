// CALL apoc.text.random('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 3) YIELD value AS letters
// CALL apoc.text.random('0123456789', 3) YIELD value AS digits
// WITH letters + digits AS newCode
// // Check if the generated code already exists
// MATCH (n {code: newCode})
// WITH newCode, count(n) AS existing
// WHERE existing = 0
// // If the code is unique, create the node or entry
// CREATE (n:YourLabel {code: newCode})
// RETURN newCode
import { validateJwt } from '../validateJwt.js';
import { getNeo4jSession } from '../getNeo4jSession.js';
import fetch from 'node-fetch';

const handler = async function (event) {
  let decodedJwt = null;
  // Validate and decode the JWT - pass function event.
  try {
    const response = await fetch(`${process.env.URL}/.netlify/functions/fetchUserData`);
    const data = await response.json();
  } catch (error){
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch user data' }),
    };
  }

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
  if(cognitoId === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid jwt id'}),
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

  
  // TODO: Eventually we may want to retry this multiple times until we hit a code that doesn't exist.
  const newCode = _createRandomCode();

  try {
    // Check if referral code exists
    const cypher = 
    `
      MATCH (u:User {id: "${cognitoId}"})
      MERGE (r:ReferralCode {code: "${newCode}"})  // Ensure ReferralCode is unique by its code
      ON CREATE SET r.createdAt = date()
      WITH u, r
      // Check if the referral code is already owned by another user
      OPTIONAL MATCH (r)<-[:OWNS]-(otherUser)
      WHERE otherUser IS NOT NULL AND otherUser <> u
      WITH u, r, otherUser
      // Proceed only if no other user owns the referral code
      WHERE otherUser IS NULL
      CREATE (u)-[:OWNS]->(r)
      RETURN u, r
      `;
    console.log(`Cypher:\n${cypher}\n`)
    const referralResult = await session.run(cypher);


    if (referralResult.records.length === 0) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to generate a code' }),
      };
    }

    const code = referralResult.records[0].get('r');
    console.log('referral code created', code);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Referral code created successfully',
        code: code,
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
function _createRandomCode(){
  return `${_createRandomAlpha(3)}-${_createRandomNumbers(3)}`
}
function _createRandomAlpha(length){
  return _createRandomString(length, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
}
function _createRandomNumbers(length){
  return _createRandomString(length, "0123456789")
}
function _createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export { handler };
