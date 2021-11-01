import cors from 'cors'

export const applyCors = () =>
  cors({
    origin: [
      '*',
      process.env.CORS_ORIGIN!,
      'http://localhost:3000',
      'https://studio.apollographql.com',
    ],
    credentials: true,
  })
