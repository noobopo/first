import jwt from 'jsonwebtoken'

import {H3Event} from 'h3'
interface jwtPayload {
    id: string,
    iat: number,
    exp: number
}

export default defineEventHandler(async (event: H3Event) => {
    try {
        const config = useRuntimeConfig()
        const url = getRequestURL(event)

        //bypass the middleware for others route
        if (url.pathname.startsWith('/api/auth') || !url.pathname.startsWith('/api')) {
            return
        }

        //getting token
        const header = getHeaders(event)
        if (!header) {
            return createError({
                statusCode : 401,
                statusMessage : "unauthorised"
            })
        }
        const token = header.authorization?.split(" ")?.at(1)

        if (!token) {
            return createError({
                statusCode: 401,
                message: "please login!",
            })
        }
        const res = await jwt.verify(token, config.JWT_SECRET) as jwtPayload
        console.log("user id is: ",res.id);

        if (!res || !res.id) {
            setResponseStatus(event, 401)
            throw createError({
                statusCode: 401,
                message: "invalid token"
            })
        }
        event.context.userId = res.id;
    } catch (error) {
        console.log(error);
    }
});
