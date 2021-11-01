import cors from 'cors'

export const applyCors = () =>
  cors({
    origin: ['*', 'http://localhost:3000', 'https://studio.apollographql.com'],
    credentials: true,
  })
