<template>
  
    <div class="users_table__wrapper">
          <VModal title="Новый пользователь" v-model="elementVisible">
<VUsersCreateForm
 :user="user!"
 @onSave="onSave"
 @onCancel="toggleElement"
>

</VUsersCreateForm>

    </VModal>
       <table class="users_table">
<thead class="users_table__head">
<tr class="users_table__row">
    <th class="users_table__head_cell">Фамилия</th>
    <th class="users_table__head_cell">Имя</th>
    <th class="users_table__head_cell">Отчество</th>
    <th class="users_table__head_cell">Дата рождения</th>
    <th class="users_table__head_cell">email</th>
    <th class="users_table__head_cell">телефон</th>
    <th class="users_table__head_cell">
        <button class="button add" @click="onAddUser">Добавить</button>
    </th>

</tr>
</thead>
<tbody class="users_table__body">
   <VUsersTableRow class="users_table__row" 
   v-for="user in users"
    :key="user.id"
    :user="user"
    />
</tbody>
    </table>  
    </div>
   
</template>
<script setup lang="ts">
import VModal from "@/components/VModal.vue";
import { useToggle } from "@/composition";
import {User} from "@/stores/models"
import { useUsersStore } from "@/stores/modules/users/use-users.store";
import { storeToRefs } from "pinia";
import VUsersCreateForm from "./VUsersCreateForm.vue";
import VUsersTableRow from "./VUsersTableRow.vue"
defineProps<{
users:User[]    
}>()

const store = useUsersStore()
const {user} = storeToRefs(store)
const {elementVisible,toggleElement} = useToggle()
const onAddUser = ()=>{
store.setUser(new User("","","",new Date(),"",""))
    toggleElement()
}
const onSave = (savedUser:User)=>{
store.setUser(savedUser)
store.saveUser().then(()=>{
    toggleElement() 
})

}
</script>
<style scoped lang="scss">

@import "../styles/users_page.styles.scss";

</style>