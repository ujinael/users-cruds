<template>
  <div class="page">
    <form class="login_form" @submit.prevent="onSubmit">
      <div class="login_form__item">
        <label for="login" class="login_form__label">
            логин
            </label>
        <input id="login" type="text" required v-model="auth.login" autocomplete="username" class="login_form__input" />
      </div>
      <div class="login_form__item">
        <label for="password" class="login_form__label">
            пароль
            </label>
        <input id="password" type="password" required v-model="auth.password" autocomplete="current-password" class="login_form__input" />
      </div>
      <button type="submit" class="login_form__submit">Авторизоваться</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { Login } from '@/stores/modules/logins/entity/login';
import { useLoginsStore } from '@/stores/modules/logins/use-logins.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const auth = ref(new Login("",""))
const store = useLoginsStore()
const router = useRouter()
const onSubmit = ()=>{
if(store.login(auth.value))router.push("/users")
else alert("Неверные логин или пароль")
}
</script>
<style scoped lang="scss">
.page {
  height: 100%;
  width: 100%;
  display: grid;
 position: relative;
}
.login_form {
    position: absolute;
    top:20%;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem;
    display: grid;
    gap: .5rem;
    background-color: white;
    border-radius: var(--common_border_radius);
    
&__item {
    display: grid;
    gap: .2em;
}
&__label {
    font-size: small;
color: slategray;
}
&__input {
    display: inline-block;
    padding: .5em 0.25em;
width: 300px;
border-radius: var(--common_border_radius);
border: 2px solid gray;

}
&__submit {
    display: inline-block;
    padding: .5em 0.25em;
    margin-top: .5em;
    background-color: #09c;
    border: 2px solid #09c;
color: white;
border-radius: var(--common_border_radius);

}
&__submit:hover{
cursor: pointer;
background-color: rgba(0, 153, 204, 0.137);
color: #09c;
}
}

</style>
