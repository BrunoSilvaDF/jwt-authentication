import { sign } from 'jsonwebtoken'
import { User } from 'src/entities'

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, 'lkasjdlfjalksejf', {
    expiresIn: '15m',
  })
}

export const createRefreshToken = (user: User) => {
  return (
    sign({ userId: user.id }, 'naslkfweajfçlk', {
      expiresIn: '7d',
    }),
    {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    }
  )
}
