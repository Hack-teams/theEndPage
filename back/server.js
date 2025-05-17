import express from "express";
import "reflect-metadata";
import TemplatePageController from "./controller/TemplatePageController.js";
import { AppDataSource } from "./data-source.js";
import TemplatePageRepository from "./repository/TemplatePageRepository.js";
import templatePageRoutes from "./route/TemplatePageRoute.js";
import TemplatePageService from "./service/TemplatePageService.js";

const app = express();
const port = 3000;

app.use(express.json());

AppDataSource.initialize()

    .then(() => {
        console.log('Connexion à PostgreSQL réussie.');

        const templatePageRepository = new TemplatePageRepository(AppDataSource);
        const templatePageService = new TemplatePageService(templatePageRepository);
        const templatePageController = new TemplatePageController(templatePageService);

        app.use('/templatePage', templatePageRoutes(templatePageController));


        app.listen(port, () => {
            console.log(`Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch(error => console.error('Erreur de connexion :', error));