const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv-flow").config();

const domain = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_ISSUER_AUDIENCE;

console.log("Domain: " + domain + "\nAudience: " + audience + "\n");

// Create middleware for checking the JWT
module.exports = jwt.expressjwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.
  aud: audience,
  issuer: `${domain}/`,
  algorithms: ["RS256"],
});
