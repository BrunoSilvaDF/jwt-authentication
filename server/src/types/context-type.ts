import { Request, Response } from 'express'
import { MyJwtPayload } from './jwt-payload-type'

export interface MyContext {
  req: Request
  res: Response
  payload?: MyJwtPayload
}
