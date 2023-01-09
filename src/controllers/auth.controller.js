
require("dotenv").config();
const usersDB = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authCtrl = {};
authCtrl.autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    //revisar el password
    let usuario = await usersDB.findOne({ where: { email: email } });
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Passwor d Incorrecto" });
    }
    const payload = {
      id_user: usuario.id_user,
      name: usuario.name,
    };
    // usuario = await usersDB.update(
    //   { where: { email: email } }
    // );
    // si todo es correcto
    // Crear y firmar el JWT
    // console.log(payload);

    // firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //1hora
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion
        res.status(200).json({ token, payload });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al autenticar usuario" });
  }
};

// obtiene que usuario esta autenticado
authCtrl.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await usersDB.findOne({
      where: { id_user: req.decoded.id_user },
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el usuario" });
  }
};

module.exports = authCtrl;