<template>
  <div class="layout-content-div">
    <div class="box"></div>
  </div>
</template>
<script lang="ts" setup>
const { path } = Object.fromEntries(new URLSearchParams(location.search))
if (path) {
  // 落地页
  window.location.href = decodeURIComponent(path)
} else {
  window.location.href = '/#/order-center'
}
</script>

<style lang="less" scoped></style>
