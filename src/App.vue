<!--
 * @Author: Czy
 * @Date: 2025-02-17 10:20:42
 * @FilePath: /b2b-official-website/src/App.vue
 *  
-->
<template>
  <RouterView />
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
//单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
