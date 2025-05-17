class AuthUsersRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository('User');
    }

    async findAll() {
        return this.repository.find();
    }

    async findById(id) {
        return this.repository.findOneBy({ id });
    }

    async findByEmail(email) {
        return this.repository.findOneBy({ email });
    }

    async save(username, email, password) {
        const user = { username, email, password };
        return this.repository.save(user);
    }

    async update(id, username, email, password) {
        const user = { id, username, email, password };
        return this.repository.save(user);
    }

    async delete({ id }) {
        return this.repository.delete({ id });
    }
}

export default AuthUsersRepository;
