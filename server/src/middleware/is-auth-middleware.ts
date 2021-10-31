import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { MyContext, MyJwtPayload } from '../types'

// Header Authorization :)
// Bearer asçdlfasejfalsjeflasjlfjaseljfaslçjfeaf

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization']

  if (!authorization) {
    throw new Error('not authenticated')
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
    context.payload = payload as MyJwtPayload
  } catch (err) {
    console.error('[error]', err)
    throw new Error('not authenticated')
  }

  return next()
}
