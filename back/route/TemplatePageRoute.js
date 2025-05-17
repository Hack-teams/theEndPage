import express from "express";

function templatePageRoutes(templatePageController) {
    const router = express.Router();

    router.get('/', (req, res) => templatePageController.getAllTemplatePage(req, res));
    router.get('/id/:id', (req, res) => templatePageController.getTemplateById(req, res));
    router.get('/tone/:tone', (req, res) => templatePageController.getTemplateByTone(req, res));
    router.post('/', (req, res) => templatePageController.addTemplatePage(req, res));
    router.put('/id/:id', (req, res) => templatePageController.updateTemplatePage(req, res));
    router.delete('/id/:id', (req, res) => templatePageController.deleteTemplate(req, res));


    return router;

}

export default templatePageRoutes;