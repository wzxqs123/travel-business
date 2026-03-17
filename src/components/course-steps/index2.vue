<template>
  <div class="z-[4] relative w-[100%] min-h-[717px] mb-128px course">
    <div class="absolute top-[122px] left-[0] right-0 m-[auto] z-[-1]">
      <div class="text-[194px] font-bold text-center year-text-bg">
        {{ selectedYear }}
      </div>
    </div>

    <div class="box-border pt-[30px] pl-[160px] mb-[58px]">
      <div class="mb-[5px] font-bold text-[50px] text-[#1A1A1A] leading-[70px]">
        企业历程
      </div>

      <div class="text-[#D6DDE3] text-[28px] leading-[40px]">Course</div>
    </div>

    <!-- 修改后的时间轴结构 -->

    <div
      class="flex justify-center items-center h-[164px] mb-[34px]"
      :class="{
        animatingLeft: isAnimatingLeft,
        animatingRight: isAnimatingRight,
      }"
    >
      <div
        v-for="(item, index) in displayedItems"
        :key="index"
        class="flex items-center"
      >
        <!-- 步骤节点 -->
        <!-- <Transition enter-active-class="animate__fadeInRight"> -->
        <div
          :data-index="index"
          class="relative flex flex-col items-center mx-[0px] mx-[-14px] step-item"
          v-if="
            !(
              (isAnimatingLeft && index == 0) ||
              (isAnimatingRight && index == displayedItems.length - 1)
            )
          "
        >
          <div
            class="text-[20px] mb-[10px] w-[44px]"
            v-if="item?.year != selectedYear"
          >
            {{ item?.year || "" }}
          </div>

          <div
            class="w-[24px] h-[24px] rounded-full transition-all"
            :class="[getStepClass(item), item ? 'mb-[36px]' : 'mb-[10px]']"
            @click="item && handleStepClick(item)"
          >
            <div v-if="item?.year == selectedYear">
              {{ item?.year || "" }}
            </div>
          </div>
        </div>
        <!-- </Transition> -->
        <!-- 连接线（非首尾节点显示） -->

        <div
          v-if="index < displayedItems.length - 1"
          class="w-[160px] h-[10px] transition-colors"
          :class="getLineClass(item, index)"
        ></div>
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

        <div
          class="w-[570px] pt-[23px] leading-[40px] text-[#2F2F2F] text-[26px] text-center"
        >
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
// 新增样式计算方法

const getStepClass = (item: any) => {
  if (!item) return "bg-[#C7C7C7] cursor-default";

  return item.year === selectedYear.value
    ? "bg-[#00D7E5] cursor-pointer active-step-indicator mx-[-12px]"
    : "bg-[#00D7E5] hover:shadow-[0_0_2px_7px_rgba(207,207,207,0.2)] cursor-pointer";
};

const onSwitch = (type: string) => {
  const currentIndex = props.courseArr.findIndex(
    (item: any) => item.year === selectedYear.value
  );

  if (type == "left" && currentIndex != 0) {
    isAnimatingRight.value = true;
    setTimeout(() => {
      selectedYear.value = props.courseArr[currentIndex - 1].year;
      isAnimatingRight.value = false;
    }, 500); // 动画持续时间
  } else if (type == "right" && currentIndex != props.courseArr.length - 1) {
    isAnimatingLeft.value = true;
    setTimeout(() => {
      selectedYear.value = props.courseArr[currentIndex + 1].year;
      isAnimatingLeft.value = false;
    }, 500); // 动画持续时间
  }
};

const getLineClass = (item: any, index: number) => {
  // const currentItem = displayedItems.value[index];

  const nextItem = displayedItems.value[index + 1];

  // console.log('zzzzzz',);

  // 当前节点或下一个节点为激活状态时显示蓝色

  // currentItem?.year === selectedYear.value ||

  // nextItem?.year === selectedYear.value

  if (item && nextItem) {
    return "bg-gradient-blue";
  }

  return "bg-gradient-gray";
};

const props = defineProps<{ courseArr: any }>();

const selectedYear = ref(2024);

// 始终显示5个时间节点

const displayedItems = computed(() => {
  const currentIndex = props.courseArr.findIndex(
    (item: any) => item.year === selectedYear.value
  );

  const result = [];

  for (let offset = -2; offset <= 2; offset++) {
    const targetIndex = currentIndex + offset;

    result.push(props.courseArr[targetIndex] || null);
  }

  return result;
});
const isAnimatingLeft = ref(false);
const isAnimatingRight = ref(false);
const getDescription = (year: number | string) => {
  const foundYear = props.courseArr.find((y: any) => y.year === year);
  return foundYear ? foundYear.description : "";
};
const handleStepClick = (item: any) => {
  let newYear = item.year;

  if (item) {
    if (newYear > selectedYear.value) {
      isAnimatingLeft.value = true;
    } else {
      isAnimatingRight.value = true;
    }

    setTimeout(() => {
      selectedYear.value = item.year;
      isAnimatingLeft.value = false;
      isAnimatingRight.value = false;
    }, 500); // 动画持续时间
  }
};
</script>

<style lang="less" scoped>
.course {
  background: url("https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/course-bg.png")
    0 0 no-repeat;

  background-size: auto 100%;
  .step-item {
    // transition: transform 1s ease-in-out;
    // background: red;
    // transform: translateX(320px);
  }

  // .animating .step-item {
  //   position: absolute;
  // }

  .animatingLeft .step-item {
    // transform: translateX(-360px);
    animation: moveAndFadeLeft 0.8s ease;
  }
  .animatingRight .step-item {
    animation: moveAndFadeRight 0.8s ease-out;
  }
  @keyframes moveAndFadeLeft {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-180px);
      opacity: 0.4;
    }
  }

  @keyframes moveAndFadeRight {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(180px);
      opacity: 0.4;
    }
  }

  // 新增渐变样式

  .bg-gradient-blue {
    background: linear-gradient(
      270deg,
      rgba(0, 215, 229, 1),
      rgba(231, 255, 211, 0.7)
    );

    border-radius: 0 30px 30px 0;
  }

  .bg-gradient-gray {
    background: linear-gradient(
      270deg,
      rgba(207, 207, 207, 1),
      rgba(239, 239, 239, 0.7)
    );
  }

  // 激活状态特殊处理

  .active-node {
    position: relative;

    .star-bg {
      background: url("https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/blue-star.png");

      background-size: 100% 100%;

      width: 164px;

      height: 164px;

      display: flex;

      align-items: center;

      justify-content: center;

      color: white;

      font-weight: bold;
    }
  }

  .year-text-bg {
    color: transparent; /* 文字颜色设置为透明，让背景渐变显示出来 */

    background: linear-gradient(
      180deg,
      #ecf0f4 20%,

      rgba(255, 255, 255, 1) 100%
    );

    -webkit-background-clip: text; /* WebKit 浏览器（如 Chrome、Safari） */

    background-clip: text;
  }

  .blue-circle {
    &:hover {
      box-shadow: 0 0 2px 7px rgba(0, 215, 229, 0.2);
    }
  }

  .grey-circle {
    &:hover {
      box-shadow: 0 0 2px 7px rgba(207, 207, 207, 0.2);
    }
  }

  .first-line-bg,
  .two-line-bg {
    background: linear-gradient(
      270deg,
      rgba(0, 215.0000023841858, 229.00000154972076, 1),
      rgba(231.49336695671082, 255, 210.9955796599388, 0.699999988079071)
    );

    border-radius: 30px 0 0 30px;
  }

  .two-line-bg {
    border-radius: 0;
  }

  .three-line-bg,
  .four-line-bg {
    background: linear-gradient(
      270deg,
      rgba(207.94642567634583, 207.94642567634583, 207.94642567634583, 1),
      rgba(
        239.82142567634583,
        239.82142567634583,
        239.82142567634583,
        0.699999988079071
      )
    );
  }

  .blue-star {
    background: url("https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/blue-star.png")
      0 0 no-repeat;

    background-size: 100% 100%;
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

.active-step-indicator {
  background: url("https://hx-mp-res.obs.cn-southwest-2.myhuaweicloud.com/b2b-official-website/blue-star.png")
    0 0 no-repeat;

  background-size: 100% 100%;

  width: 164px;

  height: 164px;

  font-weight: 700 !important;

  font-size: 24px !important;

  color: #fff !important;

  display: flex;

  align-items: center;

  justify-content: center;

  margin-bottom: 0px;
}
</style>
