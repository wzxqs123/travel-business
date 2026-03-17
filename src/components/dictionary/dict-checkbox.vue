<template>
  <CheckboxGroup v-model="newValue">
    <Checkbox
      v-for="item of options"
      :key="item.value"
      :value="item.value"
      >{{ item.label }}
    </Checkbox>
  </CheckboxGroup>
</template>
<script lang="ts" setup>
  import { computed } from "vue";
  import useDict from "@/composable/use-dict/use-dict";
  import { Checkbox, CheckboxGroup } from "@arco-design/web-vue";

  const props = defineProps<{
    value?: Array<string | number | boolean>;
    type: string;
  }>();

  const emit = defineEmits(["update:value"]);

  const dict = useDict(props.type);
  const options = computed(() => dict.value[props.type] || []);

  const newValue = computed({
    get: () => props.value,
    set: (val) => {
      emit("update:value", val);
    },
  });
</script>
