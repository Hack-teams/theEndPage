import express from "express";

function AuthUsersRoute(authUsersController) {
    const router = express.Router();
    
    router.post('/register', (req, res) => authUsersController.register(req, res));
    router.post('/login', (req, res) => authUsersController.login(req, res));
    router.put('/update/:id', (req, res) => authUsersController.updateUser(req, res));
    
    return router;

}

export default AuthUsersRoute;