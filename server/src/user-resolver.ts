import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { User } from './entities/user'
import { hash } from 'bcryptjs'

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
}
