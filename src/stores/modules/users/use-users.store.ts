
import { defineStore } from 'pinia'
import { User } from '@/stores/models/';
import {  Api } from '@/stores/store.api';
import { CreateUserDto, UpdateUserDto } from './dto';
type UsersState = {
  loading: boolean,
  user: User | null,
  users:User[]
}
export const useUsersStore = defineStore('users', {
  state: ():UsersState => {
    return {
      loading: false,
      user: null,
      users:[]
     
    }
  },
  actions: {
  setUser(user?: User) {
  this.user = user ?? new User()
  },
  async fetchUsers() {
  this.loading = true
  this.users =  await Api.shared().child('users')
  .get<User[]>([], User)
  this.loading = false
  return this.users
  },
  async fetchOneUser(id:string) {
  this.loading = true
  this.user = await Api.shared().child('users',id)
  .get<User>([], User)
  this.loading = true
  return this.user
  },
  async saveUser() {
  this.loading = true
  const saveduser = await Api.shared().child('users')
  .post<CreateUserDto, User>(this.user!.toCreate(), User)
  this.users.push(saveduser)
  this.loading = false
   },
  async updateUser() {
  this.loading = true
  const updateduser = await Api.shared().child('users',this.user!.id!+'')
  .update<UpdateUserDto, User>(this.user!.toUpdate(), User)
  this.user = updateduser
  this.loading = false
  },
  async removeUser(id:number) {
  this.loading = true
  const deleteduser = await Api.shared().child('users',id+'')
  .delete()
  this.users = this.users.filter(e=>e.id! !==id)
  this.loading = false
  },
  async  uploadImage(image:File|null) {
  if(!this.user || !image) return;
const fd = new FormData()
fd.append("image",image,image.name)
  const updatedUser = await Api.shared().child('images',`${this.user.id}`).upload<FormData,User>(fd,User)
  // console.log(updatedUser);
  
  this.user.profileImage = updatedUser.profileImage
  }
  }
  })


