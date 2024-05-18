import { modelOptions, prop, getModelForClass ,Ref } from '@typegoose/typegoose'
import { UserData } from './userDataModel'

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserLead {
  public _id?: string
  @prop({ required: true })
  public leadID!: string
//   @prop({ ref: () => UserData }) // Reference to UserData
//   public userData?: Ref<UserData>;
 
}

export const LeadModel = getModelForClass(UserLead)

















