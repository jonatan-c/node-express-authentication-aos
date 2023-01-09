

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Leer el token del header
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (token) {
    jwt.verify(token, process.env.SECRETA, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    });
  } else {
    res.status(403).send({
      mensaje: "Token no proveída.",
    });
  }
};

module.exports = auth;