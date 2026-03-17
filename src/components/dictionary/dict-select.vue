<template>
  <Select
    v-model="newValue"
    :style="style"
    :placeholder="placeholder || '请选择'"
    :multiple="multiple"
    :allow-clear="allowClear"
  >
    <Option
      v-for="item of options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></Option>
  </Select>
</template>
<script lang="ts" setup>
  import { computed } from "vue";
  import useDict from "@/composable/use-dict/use-dict";
  import { Select, Option } from "@arco-design/web-vue";

  const props = withDefaults(
    defineProps<{
      type: string | string[];
      value?: string | number | string[];
      multiple?: boolean;
      placeholder?: string;
      style?: { [key: string]: any };
      allowClear?: boolean;
    }>(),
    {
      style: () => {
        return {};
      },
    }
  );

  const type = Array.isArray(props.type) ? props.type : [props.type];

  const dict = useDict(...type);

  const options = computed(() => {
    return type.flatMap((t: string) => {
      return dict.value[t] || [];
    });
  });

  const emit = defineEmits<{
    (e: "update:value", val: string | string[] | number | undefined): void;
  }>();

  const newValue = computed({
    get: () => props.value,
    set: (val) => {
      emit("update:value", val);
    },
  });
</script>
