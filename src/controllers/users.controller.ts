import bcrypt from "bcrypt";
import { sign } from "../configs/jwt";
import UserUseCase from "../usecases/user.usecases";

const userUseCase = new UserUseCase()
class UsersController {
    async findAll(req: any, reply: any) {
        const result = await userUseCase.findAll()
        return reply.code(200).send(result)
    }

    async findById(req: any, reply: any) {
        const { id } = req.params
        const result = await userUseCase.findById(id)
        return reply.code(200).send(result)
    }

    async create(req: any, reply: any) {
        const { name, email, password } = req.body
        try {
            const data = await userUseCase.create({
                name,
                email,
                password
            })
            return reply.code(200).send(data)
        } catch (error) {
            reply.send(error)
        }
    }

    async login(req: any, reply: any) {
        const { email, password } = req.body
        const user = await userUseCase.findByEmail(email)

        if (!user) {
            return reply.status(401).send({ message: 'Email or password incorrect'})
        }

        const isSamePassword = bcrypt.compareSync(password, user.password)

        if (!isSamePassword) {
            return reply.status(401).send({ message: 'Email or password incorrect'})
        }

        const token = await sign({
            id: user.id,
            name: user.name,
            email: user.email
        })

        return reply.status(200).send({
            message: 'Successful authenticated',
            token: token
        })
    }

    async update(req: any, reply: any) {
        const { id } = req.params
        const {name, email, password} = req.body
        const data = await userUseCase.update(id, { 
            name,
            email,
            password
        })
        return reply.send(data)
    }

    async delete(req: any, reply: any) {
        const { id } = req.params
        const user = await userUseCase.delete(id)
    }
}

export default UsersController