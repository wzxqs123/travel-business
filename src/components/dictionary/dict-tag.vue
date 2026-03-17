<!--
 * @Author: Czy
 * @Date: 2024-02-06 17:25:03
 * @FilePath: /one-stack-app/packages/@vue/dictionary/src/components/dict-tag.vue
 *  
-->
<template>
  <template
    v-for="item in dictOption"
    :key="item.type + item.value"
  >
    <Tag
      v-if="item.value === newValue && !props.text"
      :checkable="props.checkable"
      :bordered="props.bordered"
      :size="props.size"
      :color="getColor(item.listClass)"
      :style="props.style"
    >
      <slot v-bind="{ dict: item }"></slot>
      <span v-if="!$slots.default"> {{ item.label }}</span>
    </Tag>
    <span v-else-if="item.value === newValue">
      <slot v-bind="{ dict: item }"></slot>
      <span
        v-if="!$slots.default"
        :style="props.style"
      >
        {{ item.label }}
      </span>
    </span>
  </template>
</template>
<script lang="ts" setup>
  import { computed, CSSProperties } from "vue";
  import { Tag } from "@arco-design/web-vue";
  import useDict from "@/composable/use-dict/use-dict";

  const props = withDefaults(
    defineProps<{
      type: string | string[];
      value?: string | number;
      size?: "small" | "medium" | "large";
      bordered?: boolean;
      pre?: string;
      text?: boolean;
      color?: string;
      checkable?: boolean;
      style?: CSSProperties;
    }>(),
    {
      size: "medium",
      checkable: false,
    }
  );
  const getColor = (listClass?: string) => {
    if (props.color) {
      return props.color;
    }
    if (listClass == "default") {
      return;
    }

    const defaultColor: { [key: string]: string } = {
      primary: "blue",
      info: "green",
      warning: "orange",
      success: "green",
      danger: "#f53f3f",
    };
    return defaultColor[listClass || ""] || listClass;
  };
  const type = Array.isArray(props.type) ? props.type : [props.type];
  const dict = useDict(...type);
  const dictOption = computed(() => {
    return type.flatMap((t: string) => {
      return dict.value[t] || [];
    });
  });
  const newValue = computed(() => props.value);
</script>
