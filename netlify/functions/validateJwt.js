import { CognitoJwtVerifier } from "aws-jwt-verify";

// Takes the full event from the netlify function to avoid duplication of code.
// Returns a decoded JWT or throws an error, so make sure to use try/catch when calling this function.
export const validateJwt = async (event) => {
  const { jwt } = JSON.parse(event.body);
  if (!jwt) {
    throw new Error('No JWT provided');
  }

  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "id",
    clientId: process.env.COGNITO_CLIENT_ID,
  });

  const payload = await verifier.verify(jwt);
  console.info("Token is valid. Payload:", payload);
  return payload;
}