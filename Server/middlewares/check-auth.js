const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: "Bearer Token"
    if (!token) {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    }

    const decodedToken = jwt.verify(token, "supersecret_of_loud_nft");
    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
