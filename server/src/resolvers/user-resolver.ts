import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { User } from '../entities'
import { MyContext } from 'src/types'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi!'
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find()
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<Boolean> {
    const hashedPassword = await hash(password, 12)
    try {
      await User.insert({
        email,
        password: hashedPassword,
      })
    } catch (err) {
      console.error(err)
      return false
    }
    return true
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.error(`[error] user { email: ${email} } not found`)
      throw new Error('could not find user')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error('bad password')
    }

    // login successful

    // refreshToken
    res.cookie(
      'jid',
      sign({ userId: user.id }, 'naslkfweajfçlk', {
        expiresIn: '7d',
      }),
      {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }
    )

    return {
      accessToken: sign({ userId: user.id }, 'lkasjdlfjalksejf', {
        expiresIn: '15m',
      }),
    }
  }
}
