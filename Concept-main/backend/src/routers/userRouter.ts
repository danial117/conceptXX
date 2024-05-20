import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User, UserModel } from '../models/userModel'
import { LeadModel,UserLead, } from '../models/leadModel'
import { MedicareAdvantageData,MedicareAdvantageModel } from '../models/userDataModel'
import { FinalExpenseData,FinalExpenseModel } from '../models/finalExpenseModel'
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
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    })
 
    res.status(200).json('ok')
  })
)




userRouter.get(
  '/leadID/:leadID',
  asyncHandler(async (req: Request, res: Response) => {

    console.log(req.params)
    const { leadID } = req.params;

  if (!leadID) {
    res.status(400).send({ message: 'leadID is required' });
    return;
  }

  try {
    // Check if the leadID already exists in the database
    const existingLead = await LeadModel.findOne({ leadID });
    if (existingLead) {
      res.status(400).send({ message: 'leadID already exists' });
      return;
    }

    // Create a new UserLead  
    const newLead = new LeadModel({ leadID });
    await newLead.save(); 

    res.status(201).send({ message: 'UserLead created successfully', lead: newLead });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }


  } 

));




userRouter.post(
  '/medicareAdvantageForm',
  asyncHandler(async (req: Request, res: Response) => {

    const medicareAdvantageForm = await MedicareAdvantageModel.create({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        phone:req.body.phone,
        zip:req.body.zipcode,
        leadID:req.body.leadID
       
      } as MedicareAdvantageData)

      console.log(medicareAdvantageForm)



  res.status(200).json(req.body)
   
  
  })
) 













userRouter.post(
  '/finalExpenseForm',
  asyncHandler(async (req: Request, res: Response) => {

    console.log(req.body)

    const medicareAdvantageForm = await FinalExpenseModel.create({
       name:req.body.name,
       email:req.body.email,
       phone:req.body.phone,
       zip:req.body.zipcode,
       leadID:req.body.leadID
       
      } as FinalExpenseData)

      console.log(medicareAdvantageForm)



  res.status(200).json(req.body)
   
  
  })
) 

















