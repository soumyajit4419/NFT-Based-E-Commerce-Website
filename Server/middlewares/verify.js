const jwt = require("jsonwebtoken");
const config = require("./../config");

const user_model = require("./../models/user");

exports.verify = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, config.jwt_secret, (err, user) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid token or token expired"
          });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      res.status(400).json({
        message: "Please provide an auth token"
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `${error.name}, ${error.message}, ${error.stack}` });
  }
};

exports.valid_user = async (req, res, next) => {
  try {
    const token = req.query.token;

    jwt.verify(token, config.jwt_secret, (err, user) => {
      if (err) {
        return res.status(400).json({
          message: "Invalid token or token expired"
        });
      } else {
        return res.status(200).json({
          message: "Valid Token"
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `${error.name}, ${error.message}, ${error.stack}` });
  }
};
