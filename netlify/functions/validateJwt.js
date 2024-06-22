import { CognitoJwtVerifier } from "aws-jwt-verify";

export const validateJwt = async (jwt) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "id",
    clientId: process.env.COGNITO_CLIENT_ID,
  });

  try {
    const payload = await verifier.verify(jwt);
    console.info("Token is valid. Payload:", payload);
    return payload;
  } catch (error) {
    console.info("Token not valid!", error);
    return null;
  }
}