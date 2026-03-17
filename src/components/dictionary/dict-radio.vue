<template>
  <RadioGroup
    v-model="newValue"
    :direction="props.direction"
    :disabled="props.isDisabled"
    :size="props.size"
    :type="props.radioGroupType"
  >
    <Radio
      v-for="item of options"
      :key="item.value"
      :value="item.value"
    >
      <div @click="onRadio(item.value)">
        <Space>
          <div>{{ item.label }}</div>
          <slot :name="item.value"></slot>
        </Space>
      </div>
    </Radio>
  </RadioGroup>
</template>
<script lang="ts" setup>
  import { computed } from "vue";
  import useDict from "@/composable/use-dict/use-dict";
  import { RadioGroup, Radio, Space } from "@arco-design/web-vue";

  const props = withDefaults(
    defineProps<{
      value?: string | number;
      type: string;
      direction?: "horizontal" | "vertical";
      isDisabled?: boolean;
      size?: "medium" | "mini" | "large" | "small" | undefined;
      radioGroupType?: "radio" | "button";
    }>(),
    {
      direction: "horizontal",
      isDisabled: false,
      size: "medium",
      radioGroupType: "radio",
    }
  );

  const emit = defineEmits(["update:value", "onRadio"]);

  const dict = useDict(props.type);
  const options = computed(() => dict.value[props.type] || []);

  const newValue = computed({
    get: () => props.value,
    set: (val) => {
      emit("update:value", val);
    },
  });
  const onRadio = (itemValue: any) => {
    emit("onRadio", itemValue);
  };
</script>
