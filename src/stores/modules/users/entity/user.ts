
import { Type } from "class-transformer"
import {type CreateUserDto,type UpdateUserDto} from '../dto/'
export class User
{
  id?: number

@Type(()=>Date)
  birthDate:Date

  profileImage?:string
  constructor(
    public surname: string = "",
    public name: string = "",
    public patronymic:string = "",
    birthDate:Date = new Date,
    public email:string = "",
    public phone:string = "",
){
this.birthDate = birthDate
}


toCreate():CreateUserDto{
return {...this}

}
toUpdate():UpdateUserDto{
return {...this,id:this.id!}

}



}
