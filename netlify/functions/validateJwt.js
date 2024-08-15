import { CognitoJwtVerifier } from "aws-jwt-verify";

// Takes the full event from the netlify function to avoid duplication of code, or just { body: { jwt } }.
// Returns a decoded JWT or throws an error, so make sure to use try/catch when calling this function.
export const validateJwt = async (event) => {
  console.log("Validating JWT", { event });
  let jwt;
  try {
    jwt = JSON.parse(event.body).jwt;
  } catch (error) {
    throw new Error('Invalid event body', event);
  }

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