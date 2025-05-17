class TemplatePageService {

    constructor(templatePageRepository) {
        this.templatePageRepository = templatePageRepository;
    }

    async getAllTemplate() {
        return this.templatePageRepository.findAll();
    }

    async getTemplateById(id) {
        return this.templatePageRepository.findById(id); 
    }

    async getTemplateByTone(tone) {
        return this.templatePageRepository.findByTone(tone); 
    }
    async addTemplatePage(title, message, tone, theme, gif_url, image_url, music_url) {
        if (!title || !message || !tone) {
            throw new Error('title , message , tone sont requis .')
        }
        return this.templatePageRepository.save(title, message, tone, theme, gif_url, image_url, music_url);
    }
    async updateTemplatePage(id, title, message, tone, theme, gif_url, image_url, music_url) {
        if (!id || !title || !message || !tone) {
            throw new Error('Id,title , message , tone sont requis .');
        }
        return this.templatePageRepository.update(id, title, message, tone, theme, gif_url, image_url, music_url);
    }

    async deleteTemplate(id) {
        if (!id) {
            throw new Error('Id requis pour la supression.');
        }
        return this.templatePageRepository.delete({ id });
    }
}


export default TemplatePageService;