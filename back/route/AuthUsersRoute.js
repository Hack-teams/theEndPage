import express from "express";

function AuthUsersRoute(authUsersController) {
    const router = express.Router();
    
    router.post('/register', (req, res) => authUsersController.addTemplatePage(req, res));
    router.post('/login', (req, res) => authUsersController.addTemplatePage(req, res));
    router.put('/update/:id', (req, res) => authUsersController.updateTemplatePage(req, res));
    
    return router;

}

export default AuthUsersRoute;