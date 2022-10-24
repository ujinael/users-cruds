<template>
 <tr class="users_table__row">
    <td class="users_table__body_cell">{{user.surname}}</td>
    <td class="users_table__body_cell">{{user.name}}</td>
    <td class="users_table__body_cell">{{user.patronymic}}</td>
    <td class="users_table__body_cell"><time :datetime="dateString(user.birthDate)">{{dateString(user.birthDate)}}</time></td>
    <td class="users_table__body_cell"><a class="link" :href="`mailto:${user.email}`">{{user.email}}</a></td>
    <td class="users_table__body_cell"><a class="link" :href="`tel:${user.phone}`">{{user.phone}}</a></td>
    <td class="users_table__body_cell actions">
        <button class="button edit" @click="onDetail(user.id!)">detail</button>
        <button class="button delete" @click="onDelete(user.id!)">delete</button></td>

</tr>
</template>
<script setup lang="ts">
import {User} from "@/stores/models"
import { useDateFormatter } from "@/composition";
import { useUsersStore } from "@/stores/modules/users/use-users.store";
import { useRouter } from "vue-router";
const router = useRouter()
defineProps<{
user:User
}>()
const {dateString} = useDateFormatter()
const store = useUsersStore()
const onDelete = (id:number)=>{
store.removeUser(id)
}
const onDetail = (id:number)=>{
router.push(`/users/${id}`)
}
</script>
<style scoped lang="scss">
@import "../styles/users_page.styles.scss";
.actions{
    display: flex;
    justify-content: center;
    gap:.5rem;
}
</style>