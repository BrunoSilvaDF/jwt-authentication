import { createApollo } from '../utils'

describe('UserResplver', () => {
  test('Should return hello', async () => {
    const apollo = await createApollo()
    // console.log('apollo', apollo)
    const result = await apollo.executeOperation({
      query: `query {
        hello
      }`,
    })
    // console.log('result', result.data)
    expect(result.data).toEqual({ hello: 'hi!' })
  })
})
