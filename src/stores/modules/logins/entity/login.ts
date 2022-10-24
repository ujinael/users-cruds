
import { Type } from "class-transformer"
import { CreateLoginDto, UpdateLoginDto} from '../dto/'
export class Login
{

  constructor(
    public login:string,
    public password:string
){}


toCreate():CreateLoginDto{
return {...this}

}




}
