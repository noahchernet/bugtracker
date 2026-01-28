import { auth } from "../lib/auth.js";

// Session-based authentication middleware
const sessionMiddleware = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    console.error("Session middleware error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default sessionMiddleware;
