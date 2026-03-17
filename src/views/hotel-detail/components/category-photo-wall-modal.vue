<template>
  <div @click.stop.prevent="handleClick">
    <slot></slot>
  </div>

  <Modal
    v-model:visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    hide-title
    :footer="false"
    fullscreen
    modal-class="p-0 select-none"
    body-class="p-0  h-full flex justify-between"
  >
    <div class="flex-1 flex items-center justify-center overflow-hidden relative bg-[#111111]">
      <div class="w-3/5 h-3/5 rounded-[10px] mb-[10px] flex items-center justify-center overflow-hidden">
        <Image
          :src="imageLists[currentImage]?.fullUrl"
          fit="cover"
          width="100%"
          class="rounded-[16px]"
          :preview="false"
        />
      </div>
      <div
        class="w-[47px] h-[47px] bg-[#414141] text-[#fff] rounded-full absolute left-[36px] top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:bg-[#707070] hover:text-[#fff]"
        @click="prevImage"
      >
        <icon-left :size="22" />
      </div>
      <div
        class="w-[47px] h-[47px] bg-[#414141] text-[#fff] rounded-full absolute right-[36px] top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:bg-[#707070] hover:text-[#fff]"
        @click="nextImage"
      >
        <icon-right :size="22" />
      </div>
      <div class="absolute bottom-[40px] right-[36px] bg-[#000] h-[38px] flex items-center justify-center px-[16px] text-[#fff] text-[18px] rounded-[21px]">
        <div class="flex items-baseline">
          <span>{{ currentImage + 1 }}</span> <span class="text-[14px] mx-[4px]">/</span> <span class="text-[14px]">{{ imageLists.length }}</span>
        </div>
      </div>
    </div>
    <div class="basis-[463px] shrink-0 grow-0 bg-[#222222] text-[rgba(255,255,255,0.5)] pt-[148px] pb-[36px] pl-[34px] box-border relative w-[463px]">
      <div
        class="absolute top-[36px] right-[34px] flex items-center justify-end w-[36px] h-[36px]"
        @click="visible = false"
      >
        <div class="absolute top-1/2 left-1/2 bg-white w-[20px] h-[20px] -translate-x-1/2 -translate-y-1/2"></div>
        <icon-close-circle-fill
          :size="36"
          class="text-[#414141] hover:text-[#707070] absolute top-0 left-0"
        />
      </div>
      <div class="absolute top-[100px] left-[34px] right-0">
        <Scrollbar
          ref="scrollTitleRef"
          style="overflow: auto"
          class="pb-[12px]"
        >
          <div class="flex items-center leading-[22px]">
            <div
              :id="'item' + index"
              class="shrink-0 mr-[32px] hover:text-[rgba(255,255,255,0.9)] cursor-pointer"
              v-for="(item, index) in props.hotelImages"
              :key="`${item.type}${index}`"
              @click="handleTagClick(index, 'item' + index)"
              :class="[index === currentTag ? 'text-[#fff]' : '']"
            >
              {{ item.typeName }}({{ item.images?.length }})
            </div>
            <div class="basis-[2px] h-[1px] shrink-0 grow-0"></div>
          </div>
        </Scrollbar>
      </div>

      <Scrollbar
        ref="scrollRef"
        outer-class="h-full  mr-[22px]"
        class="h-full pr-[12px]"
        style="overflow-y: auto"
      >
        <div class="flex flex-wrap gap-3">
          <Image
            v-for="(item, index) in imageLists"
            :key="item.thumbnailUrl"
            :src="item.thumbnailUrl"
            fit="cover"
            width="121px"
            height="121px"
            class="cursor-pointer rounded-[10px] overflow-hidden"
            :class="index === currentImage ? 'border-solid border-[2px] border-[#fff]' : 'brightness-[0.6] hover:brightness-[0.9]'"
            :preview="false"
            @click="imageClick(index)"
          />
        </div>
      </Scrollbar>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal, Image, Scrollbar, Message } from '@arco-design/web-vue'
import { HotelImages } from '@/composable/hotel/hotel.d'

const props = defineProps<{
  hotelImages: HotelImages[]
}>()

const scrollTitleRef = ref()
const scrollRef = ref()
const visible = ref(false)

const imageLists = computed(() => {
  return props.hotelImages[currentTag.value]?.images || []
})

const currentImage = ref(0)
const currentTag = ref(0)

const handleClick = () => {
  visible.value = true
}
const handleOk = () => {
  visible.value = false
}
const handleCancel = () => {
  visible.value = false
}

const imageClick = (index: number) => {
  currentImage.value = index
}
const handleTagClick = (index: number, id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }
  currentTag.value = index

  // tag切换显示第一个
  currentImage.value = 0
  scrollRef.value.scrollTop(0)
}
const prevImage = () => {
  if (currentImage.value === 0) {
    currentImage.value = imageLists.value.length - 1
    scrollRef.value.scrollTop(Math.floor(currentImage.value / 3) * 133)
  } else {
    currentImage.value -= 1
    scrollRef.value.scrollTop(Math.floor(currentImage.value / 3) * 133)
  }
}
const nextImage = () => {
  if (currentImage.value === imageLists.value.length - 1) {
    currentImage.value = 0
    scrollRef.value.scrollTop(0)
  } else {
    currentImage.value += 1
    scrollRef.value.scrollTop(Math.floor(currentImage.value / 3) * 133)
  }
}
</script>
