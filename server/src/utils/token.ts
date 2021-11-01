import { sign } from 'jsonwebtoken'
import { MyJwtPayload } from '../types'
import { User } from '../entities'
import { Response } from 'express'

const criarJwt = (payload: MyJwtPayload, secret: string, expiresIn: string) =>
  sign(payload, secret, { expiresIn })

export const createAccessToken = (user: User) => {
  return criarJwt({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, '15m')
}

export const createRefreshToken = (user: User) => {
  return criarJwt({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, '7d')
}

export const sendRefreshToken = (res: Response, user: User) => {
  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
}