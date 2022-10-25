<template>
<div class="page" v-if="user">
    <VModal title="Новый пользователь" v-model="elementVisible">
<VUsersCreateForm
 :user="user!"
 @onSave="onSave"
 @onCancel="toggleElement"
>

</VUsersCreateForm>
</VModal>
    <div class="page__component">
<div class="user__profile">
<VUserImage :user="user"/>
<div class="user__personal"> 

<span class="user__fio">
    {{userFIO}}
</span>
<div class="user__birth_date">
    д.р.:{{user.birthDate.toLocaleDateString("ru-RU",{year:"numeric",month:"long",day:"2-digit"})}}
</div>
<button class="button edit" @click="onEditUser">Редактировать</button>

</div>
</div>
    </div>
    <div class="page__component">
        <div class="user__contacts">
<h5>Контакты</h5>
            <a class="link" :href="`tel:${user.phone}`">&phone;&nbsp;+{{user.phone}}</a>
            <a class="link" :href="`mailto:${user.email}`">&#x2709;&nbsp;{{user.email}}</a>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import VModal from '@/components/VModal.vue';
import { useToggle } from '@/composition';
import { User } from '@/stores/models';
import { useUsersStore } from '@/stores/modules/users/use-users.store';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import VUserImage from './components/VUserImage.vue';
import VUsersCreateForm from './components/VUsersCreateForm.vue';
const route = useRoute()
const store = useUsersStore()
const {user} = storeToRefs(store)
 
const userFIO = computed(()=>{
    if(!user.value)return ''
    const {surname,name,patronymic}= user.value
return `${surname} ${name} ${patronymic}`
})
onMounted(()=>{
    const id = route.params.id ?? '1'
    store.fetchOneUser(`${id}`)
})

const {elementVisible,toggleElement} = useToggle()
const onEditUser = ()=>{
store.setUser(user.value!)
    toggleElement()
}
const onSave = (savedUser:User)=>{
    savedUser.id = user.value?.id
store.setUser(savedUser)
store.updateUser().then(()=>{
    toggleElement() 
})

}
</script>
<style scoped lang="scss">
@import './styles/users_detail.styles.scss';
.page{
    display: grid;
padding: 1rem;
gap: 1rem;
justify-items: center;

  &__component{
width: 100%;
background-color: white;
padding: .5rem;
box-shadow: 2px 2px 6px  gray;
border-radius: var(--common_border_radius);
}  
}


@media (min-width:599px) {
    .page__component{
        width: 500px;
    }
}
.button{
    width: 120px;
}

</style>