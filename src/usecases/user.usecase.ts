import { User, UserCreate, UserRepository } from "../interfaces/users.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepositoryPrisma()
    }

    async create({ name, email, password }: UserCreate): Promise<User> {
        const verifyIfUserExists = await this.userRepository.findByEmail(email)
        if (verifyIfUserExists) {
            throw new Error('User already exists!')
        }
        const result = await this.userRepository.create({name, email, password })

        return result
    }
}

export { UserUseCase }