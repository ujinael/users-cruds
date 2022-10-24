<template>
<div class="page">
    <VUsersTable
    :users="users"
    >

    </VUsersTable>
</div>
</template>
<script setup lang="ts">
import { useUsersStore } from '@/stores/modules/users/use-users.store';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import VUsersTable from './components/VUsersTable.vue';
const store = useUsersStore()
const {users} = storeToRefs(store)
onMounted(()=>{
    store.fetchUsers()
})
</script>
<style scoped lang="scss">
.page{
 padding: 1rem;   
 height: 100%;
 width: 100%;
 overflow-y: hidden;
}
</style>