class TemplatePageRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository('TemplatePage');
    }

    async findAll() {
        return this.repository.find();
    }
    async findById(id) {
        return this.repository.findOneBy({ id });
    }
    async findByTone(tone) {
        return this.repository.findBy({ tone });
    }

    async save(title, message, tone, theme, gif_url, image_url, music_url) {

        const TemplatePage = { title, message, tone, theme, gif_url, image_url, music_url };
        return this.repository.save(TemplatePage);

    }

    async update(id, title, message, tone, theme, gif_url, image_url, music_url) {

        const TemplatePage = { id, title, message, tone, theme, gif_url, image_url, music_url };
        return this.repository.save(TemplatePage);
    }

    async delete(id) {
        return this.repository.delete({ id });
    }
}

export default TemplatePageRepository;