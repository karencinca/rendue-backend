import { User, UserCreate, UserUpdate } from "../interfaces/user.interface"
import UserRepositoryPrisma from "../repositories/user.repository"
import UserRepository from "../repositories/user.repository"

class UserUseCase {
    private userRepository: UserRepository
    constructor(){
        this.userRepository = new UserRepositoryPrisma()
    }

    async create({name, email, password}:UserCreate): Promise<User> {
        const userExists = await this.userRepository.findByEmail(email)

        if (userExists) {
            throw new Error('User already exists')
        }

        const result = await this.userRepository.create({name, email, password})
        return result
    }

    async findAll() {
        return this.userRepository.findAll()
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const user = this.userRepository.findByEmail(email)
        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = this.userRepository.findById(id)
        return user
    }

    async update(id: string, data: UserUpdate): Promise<User | null> {
        const userUpdated = this.userRepository.update(id, data)
        return userUpdated
    } 

    async delete(id: string): Promise<void> {
        const user = this.userRepository.delete(id)
    }
}

export default UserUseCase