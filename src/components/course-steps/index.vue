<!--
 * @Author: Czy
 * @Date: 2025-02-10 13:48:34
 * @FilePath: /b2b-official-website/src/components/course-steps/index.vue
 *  
-->
<template>
  <div>
    <div class="absolute top-[156px] left-[0] right-0 m-[auto] z-[-1]">
      <div class="text-[194px] font-bold text-center year-text-bg wow animate__fadeInDown">
        {{ selectedYear }}
      </div>
    </div>
    <div class="box-border pt-[30px] pl-[160px] mb-[58px]">
      <div class="mb-[5px] font-bold text-[50px] text-[#1A1A1A] leading-[70px]">企业历程</div>
      <div class="text-[#D6DDE3] text-[28px] leading-[40px]">Course</div>
    </div>
    <div class="timeline-container wow fadeInUp">
      <!-- 步骤条部分 -->
      <div class="steps-container">
        <div
          v-for="(item, index) in displayedItems"
          :key="index"
          class="step"
          :class="{
            active: item?.year === selectedYear,
            disabled: !item,
            space: index != 0,
            short: index == 3,
          }"
          @click="handleStepClick(item)"
        >
          <div
            v-if="item?.year !== selectedYear"
            class="flex flex-col items-center mb-[40px] text-[20px] text-[#2F2F2F] wow animate__fadeIn"
          >
            {{ item?.year || '' }}
            <div class="step-indicator mt-[10px] connecting-line hover-dot"></div>
          </div>
          <div
            v-else
            class="step-label step-indicator connecting-line wow animate__fadeIn"
          >
            {{ item?.year || '' }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="flex justify-between w-[1120px]">
        <div
          class="flex items-center justify-center course-but-left"
          @click="onSwitch('left')"
        >
          <IconLeft :size="28" />
        </div>
        <div class="w-[570px] pt-[23px] leading-[40px] text-[#2F2F2F] text-[26px] text-center">
          {{ getDescription(selectedYear) }}
        </div>
        <div
          class="flex items-center justify-center course-but-right"
          @click="onSwitch('right')"
        >
          <IconRight :size="28" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ courseArr: any }>()
const selectedYear = ref(2024)

// 始终显示5个时间节点
const displayedItems = computed(() => {
  const currentIndex = props.courseArr.findIndex((item: any) => item.year === selectedYear.value)

  const result = []
  for (let offset = -2; offset <= 2; offset++) {
    const targetIndex = currentIndex + offset
    result.push(props.courseArr[targetIndex] || null)
  }
  return result
})

const handleStepClick = (item: any) => {
  if (item) {
    selectedYear.value = item.year
  }
}

const onSwitch = (type: string) => {
  const currentIndex = props.courseArr.findIndex((item: any) => item.year === selectedYear.value)

  if (type == 'left' && currentIndex != 0) {
    selectedYear.value = props.courseArr[currentIndex - 1].year
  } else if (type == 'right' && currentIndex != props.courseArr.length - 1) {
    selectedYear.value = props.courseArr[currentIndex + 1].year
  }
}

const getDescription = (year: number | string) => {
  const foundYear = props.courseArr.find((y: any) => y.year === year)
  return foundYear ? foundYear.description : ''
}
</script>
<style lang="less" scoped>
.year-text-bg {
  color: transparent; /* 文字颜色设置为透明，让背景渐变显示出来 */
  background: linear-gradient(180deg, #ecf0f4 20%, rgba(255, 255, 255, 1) 100%);
  -webkit-background-clip: text; /* WebKit 浏览器（如 Chrome、Safari） */
  background-clip: text;
}
.timeline-container {
  //   margin-bottom: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 100%;

  //   z-index: 9999;
}

.steps-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  flex: 0 1 280px;
}
.step-indicator {
  transform: translateZ(0);
  will-change: transform, background, width, height, color;

  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #00d7e5;
  //   transition:  cubic-bezier(0.4, 0, 0.2, 1);
  /* 细化过渡属性 */
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.step-label {
  margin-top: 0px;
  color: #666;
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
}
/* 激活状态样式 */
.step.active .step-indicator {
  //   background: #2196f3;
  //   transform: scale(1.3);
  //   box-shadow: 0 0 0 6px rgba(33, 150, 243, 0.15);
  /* 优化动画参数 */
  //   animation: aas 2s linear forwards infinite;

  background: url('https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/blue-star.png') 0 0 no-repeat;
  background-size: 100% 100%;
  width: 164px;
  height: 164px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700 !important;
  font-size: 24px !important;
  color: #fff !important;
  z-index: 99;
  transition: cubic-bezier(0.4, 0, 0.2, 1); /* 确保激活状态也有平滑过渡 */
}

.step.active .step-label {
  color: #2196f3;
  font-weight: 600;
  font-size: 18px;
}

/* 禁用状态样式 */
.step.disabled {
  cursor: not-allowed;
}

.step.disabled .step-indicator {
  margin-top: 38px;
  background: #c7c7c7;
  z-index: 99;
}

/* 连接线样式 */
.step.space .connecting-line::after {
  content: '';
  position: absolute;
  right: calc(100% - 2px);
  top: 8px;
  width: 210px;
  height: 10px;
  //   background: #e0e0e0;
  border-radius: 30px 0 0 30px;
  background: linear-gradient(270deg, rgba(0, 215.0000023841858, 229.00000154972076, 1), rgba(231.49336695671082, 255, 210.9955796599388, 0.699999988079071));
  z-index: 0;
}
.step.active .connecting-line::after {
  top: 78px;
  right: calc(100% - 44px);
  width: 180px;
  transition: cubic-bezier(0.4, 0, 0.2, 1); /* 添加连接线的过渡效果 */
}
.step.short .connecting-line::after {
  //   top: 78px;

  width: 160px;
}

.step.disabled .connecting-line::after {
  background: linear-gradient(270deg, rgba(207.94642567634583, 207.94642567634583, 207.94642567634583, 1), rgba(239.82142567634583, 239.82142567634583, 239.82142567634583, 0.699999988079071));
  z-index: -1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .step {
    flex-basis: 60px;
  }

  .step-label {
    font-size: 14px;
  }

  .description-container {
    font-size: 14px;
    padding: 20px;
  }
}

.course-but-left {
  width: 90px;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.1);
  border-radius: 90px 90px 90px 90px;
  &:hover {
    background: #00d7e5;
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
    color: #fff;
    cursor: pointer;
  }
}
.course-but-right {
  width: 90px;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.1);
  border-radius: 90px 90px 90px 90px;
  &:hover {
    background: #00d7e5;
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
    color: #fff;
    cursor: pointer;
  }
}
.hover-dot {
  //   background: red;
  &:hover {
    background: #00d7e5;
    box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.2);
    color: #fff;
    cursor: pointer;
  }
}

@keyframes aas {
  0% {
    transform: translateX(0px);
    width: 164px;
    height: 164px;
  }
  100% {
    transform: translateX(300px);
    display: none;
    width: 0px;
    height: 0px;
  }
}
</style>
