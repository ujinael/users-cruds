
import { defineStore } from 'pinia'
import { Login } from '@/stores/models';
import {  Api } from '@/stores/store.api';
type LoginsState = {
  loading: boolean,
}
export const useLoginsStore = defineStore('logins', {
  state: ():LoginsState => {
    return {
      loading: false,
     
    }
  },
  actions: {
  /*
  Здесь реализуется отправка на сервер данных Base Authorization на сервере генерируется токен в случае удачной авторизации
  Затем все запросы требующие авторизацию включают тем или иным способом этот токен
  Но в данном случае успешная авторизация просто сохранена в локальном хранилище и будет использована при переходах
  */
  login(login:Login){

if(login.login === "admin" && login.password==="admin"){
  localStorage.setItem("isAuth","true")
  return true
}
return false
  }
  }
  })


