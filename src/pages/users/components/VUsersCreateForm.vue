<template>
  <form class="form" v-if="userFormObject" @submit.prevent="onSave">
    <h3>Пользователь</h3>
    <div
      class="form__item"
      v-for="[key, label] in userMap.entries()"
      :key="key"
    >
      <label :for="key" class="form__label">
        {{ label }}
      </label>
      <input
        v-if="key === 'phone'"
        :id="key"
        class="form__input"
        v-numbers
        maxNum="11"
        v-model="userFormObject[key]"
        :name="key"
      />
      <input
        v-else
        :id="key"
        :type="getInputType(key)"
        :name="key"

        class="form__input"
        v-model="userFormObject[key]"
      />
    </div>
    <div class="actions">
       <button class="button add" type="submit">Сохранить</button>
    <button class="button delete" type="reset" @click.stop="emit('onCancel')">Отмена</button>

    </div>
   
  </form>
</template>
<script setup lang="ts">
import { User } from "@/stores/models";
import { onMounted, ref } from "vue";
type UserFormType = Omit<
  User,
  "birthDate" | "toCreate" | "toUpdate" | "profileImage" | "id"
> & { birthDate: string };
const userFormObject = ref<UserFormType>();
const userMap = new Map<keyof UserFormType, string>([
  ["surname", "фамилия"],
  ["name", "имя"],
  ["patronymic", "отчество"],
  ["birthDate", "дата рождения"],
  ["email", "email"],
  ["phone", "телефон"],
]);
const props = defineProps<{
  user: User;
}>();
const emit = defineEmits<{
    (event:"onSave",user:User):void
    (event:"onCancel"):void
}>()
const onSave = (e:Event)=>{
  if(!userFormObject.value)return
    const { surname, name, patronymic, birthDate, email, phone } = userFormObject.value;
 const redactedObject = new User(
    surname,name,patronymic,new Date(birthDate),email,phone
 )
 emit('onSave',redactedObject)
}
onMounted(() => {
  const { surname, name, patronymic, birthDate, email, phone } = props.user;
  const strDate = `${birthDate.getFullYear()}-${birthDate.toLocaleDateString("ru-RU",{month:"2-digit"})}-${birthDate.toLocaleDateString("ru-RU",{day:"2-digit"})}` 
  userFormObject.value = {
    surname,
    name,
    patronymic,
    birthDate: strDate,
    email,
    phone,
  };
});
const getInputType = (key: keyof UserFormType) => {
  if (key === "birthDate") {
    return "date";
  }
  if (key === "email") {
    return "email";
  }
  return "text";
};
</script>
<style scoped lang="scss">
.form {
  background-color: white;
  min-height: 50px;
  width: 100%;
  padding: 1rem;
  &__item{
    display: grid;
    gap: .2em;
    margin-top: .5rem;
  }
  &__label{
color: slategray;
font-size: small;
  }
  &__input{
    padding: .5em .3em;
  }
}
.actions{
  margin-top: .5em;
  display: flex;
  gap:1rem;
}
@media (min-width: 599px) {
  .form {
    width: 400px;
    border-radius: var(--common_border_radius);
  }
}
</style>
