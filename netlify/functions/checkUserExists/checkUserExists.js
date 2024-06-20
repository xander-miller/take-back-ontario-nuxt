import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';
import { CognitoJwtVerifier } from "aws-jwt-verify";

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

export const handler = async (event) => {
  const { jwt } = JSON.parse(event.body);
  const session = driver.session();
  const decodedJwt = JSON.parse(atob(jwt.split('.')[1]));
  console.log('aud', decodedJwt.aud);

  const verifier = CognitoJwtVerifier.create({
    userPoolId: "us-east-1:48799dbd-60f5-4ab3-94c1-95dae148d931",
    tokenUse: "access",
    clientId: decodedJwt.aud,
  });

  try {
    const payload = await verifier.verify(jwt);
    console.log("Token is valid. Payload:", payload);
  } catch {
    console.log("Token not valid!");
  }

  try {
    console.log(`Checking if user exists with ID: ${jwt}`);
    const result = await session.run(
      'MATCH (u:User {id: $cognitoId}) RETURN u',
      { cognitoId }
    );

    await session.close();

    const exists = result.records.length > 0;
    console.log(`User exists: ${exists}`);

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
