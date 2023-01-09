const { Router } = require("express");
const router = Router();

const {
  autenticarUsuario,
  usuarioAutenticado,
} = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middlewares");


router.post("/login", autenticarUsuario);

 
router.get("/",auth, usuarioAutenticado);

module.exports = router;