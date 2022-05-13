import { getSession } from "@auth0/nextjs-auth0";

const getToken = async (req, res) => {
  try {
    const session = await getSession(req, res, {
      audience: process.env.AUTH0_ISSUER_AUDIENCE,
    });
    console.log("Running...");

    // console.log("TOKENNNNN: " + session.idToken)
    res.status(200).json({ token: session.idToken });
  } catch (err) {
    console.log(err);
  }
};
export default getToken;
