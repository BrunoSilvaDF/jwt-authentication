import { sign } from 'jsonwebtoken'
import { User } from '../entities'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  })
}

export const createRefreshToken = (user: User) => {
  return (
    sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '7d',
    }),
    {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    }
  )
}
