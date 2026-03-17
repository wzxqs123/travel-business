import { PageResult, Dict, DictStore } from "@/types/page";
import { ref, watch, Ref } from "vue";
import useFetch from "@/fetch/use-fetch";

const dictStore = ref<DictStore<any>>(
  JSON.parse(sessionStorage.getItem("dict") || "{}")
);

watch(dictStore, (value) => {
  sessionStorage.setItem("dict", JSON.stringify(value));
});

const dictLoading = ref<{ [key: string]: boolean }>({});

const useDict = <T = string>(...args: string[]): Ref<DictStore<T>> => {
  const fetch = useFetch();
  const getDicts = (dictType: string) => {
    return fetch.get<PageResult<Dict>>(
      `/app/infra/platform/dict/data/type/${dictType}`
    );
  };
  args.forEach((dictType) => {
    if (!dictStore.value[dictType] && !dictLoading.value[dictType]) {
      dictStore.value[dictType] = [];
      dictLoading.value[dictType] = true;
      getDicts(dictType)
        .then((result) => {
          dictStore.value = {
            ...dictStore.value,
            [dictType]: result.rows.map((item) => {
              let business: any = item.business;
              if (typeof item.business === "string") {
                try {
                  business = JSON.parse(item.business);
                } catch (error) {}
              }
              return {
                ...item,
                label: item.dictLabel,
                value: item.dictValue,
                type: item.type,
                business,
              };
            }),
          };
        })
        .finally(() => {
          dictLoading.value[dictType] = false;
        });
    }
  });
  return dictStore;
};

export default useDict;
