import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  // const { token } = req.headers;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login Again." });
  }
  const token = authHeader.split(" ")[1]; // Extract token properly
  // console.log(token);
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again." });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error." });
  }
  // console.log("Received Authorization Header:", req.headers.authorization);
};
