export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

export interface UserCreate {
    email: string,
    name: string,
    password: string
}

export interface UserUpdate {
    email?: string,
    name?: string,
    password?: string
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    update(id: string, data: UserUpdate): Promise<User>
    delete(id: string): Promise<void>
}