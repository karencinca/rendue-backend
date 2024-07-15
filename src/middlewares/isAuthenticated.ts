import { verify } from "../plugins/jwt"

export async function isAuthenticated(req, reply) {
    const rawToken = req.headers.authorization
    const tokenParts = rawToken.split('Bearer ')
    const accessToken = tokenParts?.[1]

    const payload = await verify(accessToken)

    if (!payload) {
        return reply.code(401).send({ message: 'Invalid token' })
    }
}