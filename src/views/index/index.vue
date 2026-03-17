<!--
 * @Author: Czy
 * @Date: 2025-02-08 11:37:29
 * @FilePath: /b2b-official-website/src/views/index/index.vue
 *  
-->
<template>
  <NoLoginContent> </NoLoginContent>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import NoLoginContent from '@/components/no-login-content/index.vue'
import { useUserStore } from '@/store/user'
import authStore from '@/auth/auth-store'

const userStore = useUserStore()

onMounted(() => {
  userStore.setNavSel('index')
  const accessToken = authStore.value.token
  if (accessToken) {
    userStore.setLogonStatus(true)
  } else {
    userStore.setLogonStatus(false)
  }
})
</script>

<style lang="less" scoped>
ul {
  width: auto;
  height: auto;
  padding: 100px 250px;
  list-style: none;

  li {
    width: 100%;
    height: 150px;
    margin: 50px 0;
    color: #fff;
    text-align: center;
    line-height: 150px;
    font-size: 20px;
  }
}
</style>
