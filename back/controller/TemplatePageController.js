class TemplatePageController {
    constructor(templatePageService) {
        this.templatePageService = templatePageService;
    }

    async getAllTemplatePage(req, res) {
        try {
            const TemplatePage = await this.templatePageService.getAllTemplate();
            res.json(TemplatePage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTemplateById(req, res) {
        try {
            const { id } = req.params;
            const TemplatePage = await this.templatePageService.getTemplateById(id);
            if (!TemplatePage) {
                return res.status(404).json({ message: "Page non trouvée" });
            }
            res.json(TemplatePage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getTemplateByTone(req, res) {
        try {
            const { tone } = req.params;
            const templatePage = await this.templatePageService.getTemplateByTone(tone);
            res.json(templatePage);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addTemplatePage(req, res) {
        try {
            const { title, message, tone, theme, gif_url, image_url, music_url } = req.body;
            const TemplatePage = await this.templatePageService.addTemplatePage(title, message, tone,
                theme, gif_url, image_url, music_url);

            res.status(201).json(TemplatePage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateTemplatePage(req, res) {
        try {
            const { id } = req.params;
            const { title, message, tone, theme, gif_url, image_url, music_url } = req.body;
            const TemplatePage = await this.templatePageService.updateTemplatePage(id, title, message,
                                                           tone, theme, gif_url, image_url, music_url);
            res.json(TemplatePage);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteTemplate(req, res) {
        try {
            const { id } = req.params;
            await this.templatePageService.deleteTemplate(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


}
export default TemplatePageController;