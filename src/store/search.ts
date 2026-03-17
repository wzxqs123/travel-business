import { ref } from "vue";
import { defineStore } from "pinia";
import dayjs from "dayjs";
import { WEEK_TEXT_MAP } from "@/composable/constant";

export interface SearchInfo {
  startTime: string;
  endTime: string;
  startTimeStr: string;
  endTimeStr: string;
  adCode: string;
  cityName: string;
  //   HotelId: string;
  keyword: string;
  day: number; // 几晚
}

const startTime = dayjs().format("YYYY-MM-DD");
const endTime = dayjs().add(1, "day").format("YYYY-MM-DD");
const startTimeStr =
  dayjs(startTime).format("MM月DD日") +
  `(${WEEK_TEXT_MAP[dayjs(startTime).day()]})`;
const endTimeStr =
  dayjs(endTime).format("MM月DD日") +
  `(${WEEK_TEXT_MAP[dayjs(endTime).day()]})`;
const day = dayjs(endTime).diff(startTime, "day");

export const useSearch = defineStore("search", () => {
  // 搜索条件集合
  const searchInfo = ref<Partial<SearchInfo>>({
    startTime,
    endTime,
    startTimeStr,
    endTimeStr,
    day,
  });
  // 关键词搜索 trigger
  const visible = ref(false);
  // 热门城市 trigger
  const cityVisible = ref(false);
  // 城市搜索 trigger
  const citySearchVisible = ref(false);

  watch(
    [() => searchInfo.value.startTime, () => searchInfo.value.endTime],
    () => {
      setSearchInfo({
        day: dayjs(searchInfo.value.endTime).diff(
          searchInfo.value.startTime,
          "day"
        ),
      });
    }
  );

  const setSearchInfo = (info: Partial<SearchInfo>) => {
    searchInfo.value = {
      ...searchInfo.value,
      ...info,
    };
  };

  const setVisible = (status: boolean) => {
    visible.value = status;
  };
  const setCityVisible = (status: boolean) => {
    cityVisible.value = status;
  };
  const setCitySearchVisible = (status: boolean) => {
    citySearchVisible.value = status;
  };

  const closeCtyTrigger = () => {
    cityVisible.value = false;
    citySearchVisible.value = false;
  };
  const closeHotelTrigger = () => {
    visible.value = false;
  };
  const closeAllTrigger = () => {
    closeCtyTrigger();
    closeHotelTrigger();
  };

  return {
    searchInfo,
    setSearchInfo,
    visible,
    setVisible,
    cityVisible,
    setCityVisible,
    citySearchVisible,
    setCitySearchVisible,
    closeAllTrigger,
    closeCtyTrigger,
    closeHotelTrigger,
  };
});
