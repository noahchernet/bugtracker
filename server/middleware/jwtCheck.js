import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

const domain = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_ISSUER_AUDIENCE;

// Create middleware for checking the JWT
const jwtCheck = expressjwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.
  audience: audience,
  issuer: `${domain}/`,
  algorithms: ["RS256"],
});

export default jwtCheck;
