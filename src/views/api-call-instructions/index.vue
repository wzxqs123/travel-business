<!--
 * @Author: Czy
 * @Date: 2025-01-23 16:33:24
 * @FilePath: /b2b-official-website/src/views/api-call-instructions/index.vue
 *  api调用说明
-->
<template>
  <TabsLayout
    :tabs="tabs"
    @tapTab="tapTab"
  >
    <div
      class=""
      v-if="activityId == 0"
    >
      <div class="text-[20px] font-bold">API调用说明</div>
      <div class="mx-[1px] w-auto h-[1px] bg-[#E5E6EB] mt-[14px]"></div>

      <div class="text-[16px] font-bold mt-[50px] mb-[20px]">API接入流程</div>
      <div class="text-[#767675]">
        1、买家在嗨行旅游B2B平台注册开发者账号，并且在个人中心-授权信息中自助创建API ID和Secretkey
        <br />
        2、已创建API ID后可仔细阅读API文档，获取以下关键信息：接口地址、请求参数格式、签名算法等等<br />
        3、请根据嗨行旅游B2B平台提供的API文档进行设计与调试，并且在调试过程中及时处理问题，最终经过测试验证后切换至正式环境上线
      </div>
      <div class="text-[16px] font-bold mt-[50px] mb-[20px]">API接入信息</div>
      <Table
        :columns="columns"
        :data="data"
        :pagination="false"
      />

      <Button
        class="w-[250px] mt-[40px] !text-[18px] !font-bold h-[45px] rounded-[8px] !bg-[#FF5D15] !text-[#fff]"
        @click="onPersonalCenter"
      >
        申请合作
      </Button>
    </div>
    <div v-if="activityId == 1">2</div>
  </TabsLayout>
</template>
<script lang="ts" setup>
import { Button, Table } from '@arco-design/web-vue'
import TabsLayout from '@/components/tabs-layout/index.vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const tapTab = (id: number) => {
  activityId.value = id
}

const activityId = ref(0)

const tabs = ref([
  {
    id: 0,
    name: 'API调用说明',
  },
])
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '解释说明',
    dataIndex: 'statement',
  },
]
const data = reactive([
  {
    name: 'API ID',
    statement: 'Application Programming Interface应用程序接口',
  },
  {
    name: 'secretKey',
    statement: '请求密钥，申请API接入后即可获得。用于验签和加解密',
  },
])
const onPersonalCenter = () => {
  userStore.setNavSel('PersonalCenter')
  router.push('/personal-center')
}
</script>
<style lang="less" scoped>
.select-tab {
  background: #f2f3f5;
}
</style>
