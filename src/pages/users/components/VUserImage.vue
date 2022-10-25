<template>
<div class="user__image_wrapper">
    <img type="image" class="user__image" :src="imageUrl" alt="avatar" @click="onImageClick">   
       <input class="image_picker" ref="imagePicker" type="file"  accept="image" @change="uploadImage"> 
</div>
</template>
<script setup lang="ts">
import { User } from '@/stores/models';
import { useUsersStore } from '@/stores/modules/users/use-users.store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const props = defineProps<{
    user:User
}>()
const store = useUsersStore()
// const {user} = storeToRefs(store)
const imageUrl = computed(()=>{
  if(props.user.profileImage){
    return new URL(`http://localhost:5173/api/images/${props.user.profileImage}`, import.meta.url).href
  }
    return new URL(`http://localhost:5173/api/images/fish.jpeg`, import.meta.url).href
 }) 
const imagePicker = ref<HTMLInputElement>()
// const selectedImage = ref<string>("")
const onImageClick = ()=>{
    if(!imagePicker.value) return;
    imagePicker.value.click()
}
 const uploadImage=(e:Event)=>{
    const el = e.target as HTMLInputElement
                const image = el.files!.item(0);
    store.uploadImage(image) 
                // const reader = new FileReader();
                // reader.readAsDataURL(image!);
                // reader.onload = e =>{
                //     selectedImage.value = e.target?.result?.toString() ?? ""
                   
                // };
            }
</script>
<style scoped lang="scss">
@import '../styles/users_detail.styles.scss';

</style>