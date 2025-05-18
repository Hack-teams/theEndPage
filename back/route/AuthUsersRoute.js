import express from "express";
import upload from "../middleware/upload.js";

function AuthUsersRoute(authUsersController) {
  const router = express.Router();

  // utilise multer ici pour le champ "image"
  router.post('/register', upload.single("image"), (req, res) => authUsersController.register(req, res));

  router.post('/login', (req, res) => authUsersController.login(req, res));
  router.put('/update/:id', (req, res) => authUsersController.updateUser(req, res));

  return router;
}

export default AuthUsersRoute;
