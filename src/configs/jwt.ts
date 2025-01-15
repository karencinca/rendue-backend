import jwt from 'jsonwebtoken'

export async function verify(token: any) {
    try {
        return jwt.verify(token, `${process.env.JWT_KEY}`)
    } catch (error) {
        console.log(error)
        return false
    }
}

export async function sign(payload: any) {
    return jwt.sign(payload, `${process.env.JWT_KEY}`, {
        expiresIn: "1h"
    })
}