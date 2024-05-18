import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User, UserModel } from '../models/userModel'
import { LeadModel,UserLead, } from '../models/leadModel'
import { UserData,UserDataModel } from '../models/userDataModel'
import { generateToken } from '../utils'
import crypto from 'crypto'

export const userRouter = express.Router()
// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).json({ message: 'Invalid email or password' })
  })
)

userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body)
    // const user = await UserModel.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: bcrypt.hashSync(req.body.password),
    // } as User)
    // res.json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   token: generateToken(user),
    // })

    res.status(200).json('ok')
  })
)









userRouter.post(
  '/medicareAdvantageForm',
  asyncHandler(async (req: Request, res: Response) => {

  console.log(req.body)

    
   

  res.status(200).json(req.body)
   
  





   
   
 
    
  })
) 





























