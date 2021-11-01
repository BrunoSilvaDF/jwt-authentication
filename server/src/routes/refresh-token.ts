import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { token } from '../utils'
import { User } from '../entities'

const invalidToken = { ok: false, accessToken: '' }

export const refreshTokenRoute = async (req: Request, res: Response) => {
  const accessToken = req.cookies.jid
  if (!accessToken) {
    return res.send(invalidToken)
  }

  let payload: any = null
  try {
    payload = verify(accessToken, process.env.REFRESH_TOKEN_SECRET!)
  } catch (err) {
    console.error('[error]', err)
    return res.send(invalidToken)
  }

  // token is valid and we can sand back an accessToken
  const user = await User.findOne({ id: payload.userId })

  if (!user) {
    console.error('[error] invalid token')
    return res.send(invalidToken)
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    console.error('[error] invalid token')
    return res.send(invalidToken)
  }

  token.sendRefreshToken(res, user)

  console.log('[server] refreshed token')
  return res.send({
    ok: true,
    accessToken: token.createAccessToken(user),
  })
}
