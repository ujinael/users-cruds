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
<div class="user__image_wrapper">
    <img type="image" class="user__image" :src="imageUrl" alt="avatar" @click="onImageClick">   
       <input class="image_picker" ref="imagePicker" type="file"  accept="image" @change="uploadImage"> 
</div>
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
import VUsersCreateForm from './components/VUsersCreateForm.vue';
const route = useRoute()
const store = useUsersStore()
const {user} = storeToRefs(store)
 const imageUrl = computed(()=>{
  if(selectedImage.value){
    return selectedImage.value
  }
    return new URL(`../../assets/fish.jpeg`, import.meta.url).href
 }) 
const imagePicker = ref<HTMLInputElement>()
const selectedImage = ref<string>("")
const onImageClick = ()=>{
    if(!imagePicker.value) return;
    imagePicker.value.click()
}
 const uploadImage=(e:Event)=>{
    const el = e.target as HTMLInputElement
                const image = el.files!.item(0);
                
                const reader = new FileReader();
                reader.readAsDataURL(image!);
                reader.onload = e =>{
                    selectedImage.value = e.target?.result?.toString() ?? ""
                   
                };
            }
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
.user{
    &__image_wrapper{
width: 100%;
height: 200px;
position: relative;
object-fit: cover;
overflow: hidden;
border-radius: var(--common_border_radius);
    }
    &__image{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
min-width: 100%;
height: auto;
    }
    &__image:hover{
        opacity: .5;
    }
    &__image_wrapper:hover:after{
        content: "Изменить";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: large;
        opacity: .5;
        z-index: 5;
        pointer-events: none;
    }
    &__personal{
        margin-top: 1rem;
        display: grid;
        gap: .5em;
    }
    &__birth_date{
color: gray;
font-size: small;
    }
    &__contacts{
        display: grid;
        gap: .5rem;
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
.image_picker{
    display: none;
}
</style>