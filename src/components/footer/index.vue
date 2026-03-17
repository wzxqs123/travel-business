<template>
  <div class="custom-footer">
    <div class="max-w-[1400px] text-[#fff] mx-auto flex items-center justify-between h-full">
      <div class="basis-[260px] shrink-0">
        <img
          src="https://hx-mp-res.hitrips.cn/b2b-official-website/logo-white.png"
          alt=""
        />
        <div class="text-[#999A9F] text-[14px] mt-[21px]">
          © 2018 - 2025 厦门嗨行旅游服务有限公司
          <span
            class="cursor-pointer"
            @click="goFilingBureau"
          >
            闽ICP备18024540号
          </span>
          <!-- 闽公安网新22354525522416号 -->
        </div>
      </div>
      <div class="flex items-start">
        <div class="basis-[111px] shrink-0 mr-[140px]">
          <Image
            :src="userStore.customerDetail?.weworkQrCodeUrl || userStore.customerDetail?.wechatQrCodeUrl || 'https://hx-mp-res.hitrips.cn/b2b-official-website/service-qr-code.jpg'"
            fit="fill"
            height="111px"
            width="111px"
            :preview="false"
          />
          <div class="mt-[14px] text-center">联系我们</div>
        </div>
        <div class="grid grid-cols-[auto_auto_auto] gap-x-[80px] gap-y-[18px]">
          <div class="text-[#999A9F]">
            <Space
              direction="vertical"
              :size="18"
              fill
            >
              <div class="text-white">产品</div>

              <div
                class="cursor-pointer hover:text-white"
                @click="goHome"
              >
                酒店
              </div>
            </Space>
          </div>
          <div class="text-[#999A9F]">
            <Space
              direction="vertical"
              :size="18"
              fill
            >
              <div class="text-white">支持</div>
              <div
                class="cursor-pointer hover:text-white"
                @click="goTermsOfService"
              >
                服务条款
              </div>
              <div
                class="cursor-pointer hover:text-white"
                @click="goPrivacyPolicy"
              >
                隐私条款
              </div>
            </Space>
          </div>
          <div class="text-[#999A9F]">
            <Space
              direction="vertical"
              :size="18"
              fill
            >
              <div class="text-white">联系方式</div>
              <div v-if="userStore.customerDetail?.tel || userStore.customerDetail?.phone">
                {{ `电话 ${userStore.customerDetail?.tel || userStore.customerDetail?.phone}` }}
              </div>
              <div>{{ `邮箱 ${userStore.customerDetail?.email || '-'}` }}</div>
              <div>联系我们</div>
            </Space>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Space } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const router = useRouter()

const goHome = () => {
  router.push('/order-center')
}

const goInstruction = () => {
  router.push('/api-call-instructions')
}

const goTermsOfService = () => {
  // 服务条款
  router.push({ path: '/service-agreement' })
}

const goPrivacyPolicy = () => {
  // 隐私条款
  router.push({ path: '/privacy-policy' })
}
const goFilingBureau = () => {
  // 服务条款
  window.open('https://beian.miit.gov.cn/#/Integrated/recordQuery')
}
</script>

<style scoped lang="less">
.custom-footer {
  min-width: 1440px;
  height: 346px;
  background-image: url('https://hx-mp-res.hitrips.cn/b2b-official-website/footer.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
